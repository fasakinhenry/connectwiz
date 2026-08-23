export interface GeoLocation {
  city: string;
  country: string;
  lat?: number;
  lng?: number;
}

export type Experience = 'student' | 'entry' | 'mid' | 'senior' | 'lead' | 'founder';
export type Gender = 'female' | 'male' | 'non-binary' | 'unspecified';

export interface NetworkingPreferences {
  meetingStyle: 'remote' | 'in-person' | 'either';
  industries: string[];
  skillsWanted: string[];
  locationPref: 'near-me' | 'anywhere';
}

export interface NetworkingProfile {
  id: string;
  name: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  location: GeoLocation;
  gender: Gender;
  profession: string;
  education: string[];
  organization?: string;
  experience: Experience;
  skills: string[];
  interests: string[];
  goals: string[];
  lookingFor: string[];
  canOffer: string[];
  industries: string[];
  networkingPreferences: NetworkingPreferences;
  personalitySignals: string[];
  tags: string[];
  communities: string[];
  events: string[];
  isSelf?: boolean;
}

export type ConnectionStatus = 'none' | 'pending-outgoing' | 'pending-incoming' | 'connected';

export interface SearchIntent {
  supported: boolean;
  rawQuery: string;
  location?: 'near_me';
  gender?: Gender;
  skills: string[];
  interests: string[];
  goals: string[];
  keywords: string[];
}

export interface SearchResultPerson {
  profile: NetworkingProfile;
  matchScore: number;
  reasons: string[];
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  personId: string;
  unread: number;
  online: boolean;
  messages: ChatMessage[];
}

export type PostKind = 'text' | 'update' | 'project' | 'event';

export interface PostComment {
  id: string;
  authorId: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  kind: PostKind;
  content: string;
  createdAt: string;
  likes: number;
  likedByMe: boolean;
  comments: PostComment[];
}

export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  tags: string[];
  recentActivity: string;
}

export interface NetworkingEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  attendeeIds: string[];
}

export type ActivityKind =
  | 'connection_request'
  | 'connection_accept'
  | 'like'
  | 'comment'
  | 'streak'
  | 'mission'
  | 'suggestion'
  | 'onboarding';

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  text: string;
  createdAt: string;
  personId?: string;
}

export interface Achievement {
  id: string;
  label: string;
  description: string;
  unlocked: boolean;
}

export interface DailyGoal {
  id: string;
  label: string;
  target: number;
  progress: number;
}

export interface GamificationState {
  xp: number;
  streak: number;
  lastActiveDate: string | null;
}

export const XP_LEVELS = [
  { name: 'Beginner', min: 0 },
  { name: 'Networker', min: 100 },
  { name: 'Connector', min: 300 },
  { name: 'Community Builder', min: 700 },
  { name: 'Networking Master', min: 1500 },
] as const;

export function levelForXp(xp: number) {
  let current: (typeof XP_LEVELS)[number] = XP_LEVELS[0];
  let index = 0;
  for (let i = 0; i < XP_LEVELS.length; i++) {
    if (xp >= XP_LEVELS[i].min) {
      current = XP_LEVELS[i];
      index = i;
    }
  }
  const next = XP_LEVELS[index + 1];
  return {
    name: current.name,
    index,
    min: current.min,
    next: next ? next.min : null,
    progress: next ? (xp - current.min) / (next.min - current.min) : 1,
  };
}
