import { levelForXp } from '@/lib/connectwiz-types';
import type { Achievement, DailyGoal } from '@/lib/connectwiz-types';
import type { StoreState } from './store';

const MISSIONS = [
  'Connect with someone who has a skill you want to learn.',
  'Send a meaningful message to someone new.',
  'Discover 3 new people in Search.',
  'Join a community that matches one of your goals.',
  'RSVP to an event you might actually attend.',
  'Update your profile with something you\'ve learned recently.',
];

function dayOfYear(d = new Date()) {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

export function getTodayMission(): string {
  return MISSIONS[dayOfYear() % MISSIONS.length];
}

export function getLevel(xp: number) {
  return levelForXp(xp);
}

export function getDailyGoals(state: StoreState): DailyGoal[] {
  const today = new Date().toISOString().slice(0, 10);
  const counts = state.dailyCounts[today] ?? { connects: 0, messages: 0, profileViews: [] };
  return [
    { id: 'meet', label: 'Meet 1 new person', target: 1, progress: Math.min(counts.connects, 1) },
    { id: 'message', label: 'Send 1 meaningful message', target: 1, progress: Math.min(counts.messages, 1) },
    { id: 'discover', label: 'Discover 3 new people', target: 3, progress: Math.min(counts.profileViews.length, 3) },
  ];
}

export function getAchievements(state: StoreState): Achievement[] {
  const connectedCount = Object.values(state.connections).filter((s) => s === 'connected').length;
  const communitiesJoined = Object.values(state.communities).filter(Boolean).length;
  const messagesSent = Object.values(state.conversations).reduce(
    (n, c) => n + c.messages.filter((m) => m.senderId === 'me').length,
    0
  );

  return [
    { id: 'first_connection', label: 'First Connection', description: 'Connect with one person.', unlocked: connectedCount >= 1 },
    { id: 'conversation_starter', label: 'Conversation Starter', description: 'Send your first message.', unlocked: messagesSent >= 1 },
    { id: 'community_explorer', label: 'Community Explorer', description: 'Join a community.', unlocked: communitiesJoined >= 1 },
    { id: 'network_builder', label: 'Network Builder', description: 'Connect with 5 people.', unlocked: connectedCount >= 5 },
    { id: 'connector', label: 'Connector', description: 'Connect with 10 people.', unlocked: connectedCount >= 10 },
    { id: 'seven_day_streak', label: '7-Day Streak', description: 'Keep a 7-day networking streak.', unlocked: state.gamification.streak >= 7 },
  ];
}
