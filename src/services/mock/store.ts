import type {
  ActivityItem,
  Conversation,
  ChatMessage,
  ConnectionStatus,
  GamificationState,
  NetworkingProfile,
  Post,
  PostKind,
} from '@/lib/connectwiz-types';
import { findPerson } from './seed-people';

interface DailyCounts {
  connects: number;
  messages: number;
  profileViews: string[];
}

interface StoreState {
  profile: NetworkingProfile | null;
  onboardingComplete: boolean;
  connections: Record<string, ConnectionStatus>;
  conversations: Record<string, Conversation>;
  posts: Post[];
  communities: Record<string, boolean>;
  eventRsvps: Record<string, boolean>;
  activity: ActivityItem[];
  gamification: GamificationState;
  dailyCounts: Record<string, DailyCounts>;
}

const STORAGE_KEY = 'connectwiz_store_v1';

const SEED_POSTS: Post[] = [
  {
    id: 'seed-post-1',
    authorId: 'p3',
    kind: 'project',
    content: 'Shipped the first agent-to-agent handoff in Loopwork today. Looking for 2 AI engineers who want to help push it further — DM me if that\'s you.',
    createdAt: hoursAgo(3),
    likes: 24,
    likedByMe: false,
    comments: [],
  },
  {
    id: 'seed-post-2',
    authorId: 'p7',
    kind: 'update',
    content: 'We crossed 10,000 merchants this week. Huge thanks to everyone in the Founders community who talked me off a ledge in month 2.',
    createdAt: hoursAgo(7),
    likes: 41,
    likedByMe: false,
    comments: [{ id: 'c1', authorId: 'p9', text: 'Incredible milestone. Proud of you!', createdAt: hoursAgo(6) }],
  },
  {
    id: 'seed-post-3',
    authorId: 'p10',
    kind: 'text',
    content: 'Looking for collaborators for a small AI-native design system experiment. If you\'re a frontend dev who cares about micro-interactions, let\'s talk.',
    createdAt: hoursAgo(20),
    likes: 15,
    likedByMe: false,
    comments: [],
  },
];

function hoursAgo(h: number) {
  const d = new Date();
  d.setHours(d.getHours() - h);
  return d.toISOString();
}

const SEED_ACTIVITY: ActivityItem[] = [
  { id: 'seed-a1', kind: 'suggestion', text: '5 people match your networking goals. Try a search.', createdAt: hoursAgo(2) },
  { id: 'seed-a2', kind: 'connection_accept', text: 'Kunle Adebayo joined the Software Engineers community.', createdAt: hoursAgo(9), personId: 'p4' },
  { id: 'seed-a3', kind: 'like', text: 'Chiamaka Nwosu liked a post in Startup Founders.', createdAt: hoursAgo(15), personId: 'p7' },
  { id: 'seed-a4', kind: 'suggestion', text: 'The Lagos AI Meetup is happening this week — 5 people you might know are going.', createdAt: hoursAgo(22) },
];

function defaultState(): StoreState {
  return {
    profile: null,
    onboardingComplete: false,
    connections: {},
    conversations: {},
    posts: SEED_POSTS,
    communities: {},
    eventRsvps: {},
    activity: SEED_ACTIVITY,
    gamification: { xp: 0, streak: 0, lastActiveDate: null },
    dailyCounts: {},
  };
}

function load(): StoreState {
  if (typeof window === 'undefined') return defaultState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<StoreState>;
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
}

let state = load();
const listeners = new Set<() => void>();

function persist() {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function ensureDaily(): DailyCounts {
  const key = todayKey();
  if (!state.dailyCounts[key]) {
    state.dailyCounts[key] = { connects: 0, messages: 0, profileViews: [] };
  }
  return state.dailyCounts[key];
}

function uid(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function pushActivity(item: Omit<ActivityItem, 'id' | 'createdAt'>) {
  state.activity = [{ ...item, id: uid('act'), createdAt: new Date().toISOString() }, ...state.activity].slice(0, 100);
}

function touchStreak() {
  const today = todayKey();
  const g = state.gamification;
  if (g.lastActiveDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const wasYesterday = g.lastActiveDate === yesterday.toISOString().slice(0, 10);

  const nextStreak = wasYesterday ? g.streak + 1 : 1;
  state.gamification = { ...g, streak: nextStreak, lastActiveDate: today };
  pushActivity({ kind: 'streak', text: `Your networking streak is now ${nextStreak} day${nextStreak === 1 ? '' : 's'} 🔥` });
}

function addXp(amount: number) {
  touchStreak();
  state.gamification = { ...state.gamification, xp: state.gamification.xp + amount };
}

const CANNED_REPLIES = [
  "Hey! Thanks for reaching out 👋",
  "Nice to connect! What are you working on right now?",
  "Appreciate you reaching out — always happy to talk shop.",
  "That sounds great, let's set something up sometime!",
  "Love this. Tell me more?",
];

export const store = {
  getState(): Readonly<StoreState> {
    return state;
  },

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  completeOnboarding(profile: NetworkingProfile) {
    state.profile = profile;
    state.onboardingComplete = true;
    addXp(50);
    pushActivity({ kind: 'onboarding', text: 'You completed your ConnectWiz profile. Time to find your people!' });
    emit();
  },

  updateProfile(patch: Partial<NetworkingProfile>) {
    if (!state.profile) return;
    state.profile = { ...state.profile, ...patch };
    emit();
  },

  getConnectionStatus(personId: string): ConnectionStatus {
    return state.connections[personId] ?? 'none';
  },

  connectTo(personId: string) {
    if ((state.connections[personId] ?? 'none') !== 'none') return;
    const person = findPerson(personId);
    state.connections = { ...state.connections, [personId]: 'pending-outgoing' };
    ensureDaily().connects += 1;
    addXp(10);
    pushActivity({ kind: 'connection_request', text: `You sent a connection request to ${person?.name ?? 'someone'}.`, personId });
    emit();

    setTimeout(() => {
      state.connections = { ...state.connections, [personId]: 'connected' };
      addXp(20);
      pushActivity({ kind: 'connection_accept', text: `${person?.name ?? 'They'} accepted your connection request!`, personId });

      const conv = state.conversations[personId] ?? { id: uid('conv'), personId, unread: 0, online: Math.random() > 0.4, messages: [] };
      const opener: ChatMessage = {
        id: uid('msg'),
        conversationId: conv.id,
        senderId: personId,
        text: CANNED_REPLIES[0],
        createdAt: new Date().toISOString(),
      };
      state.conversations = { ...state.conversations, [personId]: { ...conv, messages: [...conv.messages, opener], unread: conv.unread + 1 } };
      emit();
    }, 1600 + Math.random() * 900);
  },

  getConversation(personId: string): Conversation | null {
    return state.conversations[personId] ?? null;
  },

  sendMessage(personId: string, text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const conv = state.conversations[personId] ?? { id: uid('conv'), personId, unread: 0, online: true, messages: [] };
    const isFirst = conv.messages.filter((m) => m.senderId === 'me').length === 0;
    const message: ChatMessage = { id: uid('msg'), conversationId: conv.id, senderId: 'me', text: trimmed, createdAt: new Date().toISOString() };
    state.conversations = { ...state.conversations, [personId]: { ...conv, messages: [...conv.messages, message] } };
    ensureDaily().messages += 1;
    if (isFirst) addXp(15);
    else touchStreak();
    emit();

    setTimeout(() => {
      const current = state.conversations[personId];
      if (!current) return;
      const reply: ChatMessage = {
        id: uid('msg'),
        conversationId: current.id,
        senderId: personId,
        text: CANNED_REPLIES[Math.floor(Math.random() * CANNED_REPLIES.length)],
        createdAt: new Date().toISOString(),
      };
      state.conversations = { ...state.conversations, [personId]: { ...current, messages: [...current.messages, reply], unread: current.unread + 1 } };
      emit();
    }, 1400 + Math.random() * 1600);
  },

  markConversationRead(personId: string) {
    const conv = state.conversations[personId];
    if (!conv || conv.unread === 0) return;
    state.conversations = { ...state.conversations, [personId]: { ...conv, unread: 0 } };
    emit();
  },

  recordProfileView(personId: string) {
    const daily = ensureDaily();
    if (!daily.profileViews.includes(personId)) {
      daily.profileViews = [...daily.profileViews, personId];
      emit();
    }
  },

  createPost(content: string, kind: PostKind = 'text') {
    const trimmed = content.trim();
    if (!trimmed) return;
    const post: Post = { id: uid('post'), authorId: 'me', kind, content: trimmed, createdAt: new Date().toISOString(), likes: 0, likedByMe: false, comments: [] };
    state.posts = [post, ...state.posts];
    addXp(10);
    emit();
  },

  toggleLike(postId: string) {
    state.posts = state.posts.map((p) =>
      p.id === postId ? { ...p, likedByMe: !p.likedByMe, likes: p.likes + (p.likedByMe ? -1 : 1) } : p
    );
    emit();
  },

  addComment(postId: string, text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    state.posts = state.posts.map((p) =>
      p.id === postId
        ? { ...p, comments: [...p.comments, { id: uid('cmt'), authorId: 'me', text: trimmed, createdAt: new Date().toISOString() }] }
        : p
    );
    emit();
  },

  isCommunityJoined(communityId: string) {
    return Boolean(state.communities[communityId]);
  },

  toggleCommunity(communityId: string) {
    const joined = Boolean(state.communities[communityId]);
    state.communities = { ...state.communities, [communityId]: !joined };
    if (!joined) addXp(15);
    emit();
  },

  isEventRsvpd(eventId: string) {
    return Boolean(state.eventRsvps[eventId]);
  },

  toggleEventRsvp(eventId: string) {
    const going = Boolean(state.eventRsvps[eventId]);
    state.eventRsvps = { ...state.eventRsvps, [eventId]: !going };
    if (!going) addXp(15);
    emit();
  },

  getTodayCounts(): DailyCounts {
    return state.dailyCounts[todayKey()] ?? { connects: 0, messages: 0, profileViews: [] };
  },

  getPostAuthPath(): string {
    return state.onboardingComplete ? '/dashboard' : '/onboarding';
  },

  reset() {
    state = defaultState();
    emit();
  },
};

export type { StoreState };
