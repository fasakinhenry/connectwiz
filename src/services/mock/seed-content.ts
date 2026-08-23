import type { CommunityGroup, NetworkingEvent } from '@/lib/connectwiz-types';

export const SEED_COMMUNITIES: CommunityGroup[] = [
  {
    id: 'c1',
    name: 'AI Builders',
    description: 'People shipping real products with AI — engineers, researchers, and designers.',
    memberCount: 4820,
    tags: ['AI', 'Machine Learning'],
    recentActivity: '32 new posts this week',
  },
  {
    id: 'c3',
    name: 'Startup Founders',
    description: 'Early-stage founders trading notes on fundraising, hiring, and staying sane.',
    memberCount: 2110,
    tags: ['Startups', 'Fundraising'],
    recentActivity: 'Femi Alabi just answered 6 questions',
  },
  {
    id: 'c4',
    name: 'Robotics',
    description: 'Builders of things that move — drones, arms, and everything in between.',
    memberCount: 860,
    tags: ['Robotics', 'Hardware'],
    recentActivity: 'Priya Sharma shared a new build',
  },
  {
    id: 'c5',
    name: 'Software Engineers',
    description: 'A home base for developers of every stack to share, ask, and pair up.',
    memberCount: 6340,
    tags: ['Software Development'],
    recentActivity: '128 members online now',
  },
  {
    id: 'c6',
    name: 'Health x AI',
    description: 'Applying machine learning to diagnostics, care delivery, and public health.',
    memberCount: 540,
    tags: ['Healthcare', 'AI'],
    recentActivity: 'New paper discussion pinned',
  },
  {
    id: 'c7',
    name: 'Open Source',
    description: 'Maintainers and contributors keeping the internet\'s plumbing running.',
    memberCount: 1980,
    tags: ['Open Source'],
    recentActivity: 'Michael Chen merged 3 PRs today',
  },
  {
    id: 'c8',
    name: 'Design',
    description: 'Product and UX designers sharing critique, process, and craft.',
    memberCount: 3020,
    tags: ['Design'],
    recentActivity: 'Ada Eze posted a case study',
  },
];

export const SEED_EVENTS: NetworkingEvent[] = [
  {
    id: 'e1',
    title: 'Lagos AI Meetup',
    date: nextDate(4),
    location: 'Lagos, Nigeria',
    description: 'A monthly gathering for people building with AI in Lagos — lightning talks, demos, and networking.',
    attendeeIds: ['p1', 'p4', 'p5', 'p10', 'p11'],
  },
  {
    id: 'e2',
    title: 'Health x AI Summit',
    date: nextDate(11),
    location: 'Remote',
    description: 'Researchers and builders applying AI to healthcare share what\'s actually working.',
    attendeeIds: ['p2', 'p7', 'p8'],
  },
  {
    id: 'e3',
    title: 'Founders & Funders Mixer',
    date: nextDate(18),
    location: 'Lagos, Nigeria',
    description: 'An intimate mixer for early-stage founders and the people who back them.',
    attendeeIds: ['p3', 'p6', 'p7', 'p9', 'p11'],
  },
];

function nextDate(daysFromNow: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString();
}
