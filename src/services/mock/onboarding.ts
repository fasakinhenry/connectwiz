import type { Experience, NetworkingProfile } from '@/lib/connectwiz-types';

export type OnboardingFieldKey =
  | 'location'
  | 'profession'
  | 'organization'
  | 'experience'
  | 'skills'
  | 'interests'
  | 'goals'
  | 'lookingFor'
  | 'canOffer'
  | 'meetingStyle';

export interface OnboardingStep {
  key: OnboardingFieldKey;
  question: string;
  placeholder: string;
  chips?: string[];
  multi?: boolean;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    key: 'location',
    question: "Where are you based? City is enough — this helps me find people near you.",
    placeholder: 'e.g. Lagos, Nigeria',
  },
  {
    key: 'profession',
    question: "Nice. What do you do? Your role or profession.",
    placeholder: 'e.g. Frontend developer, product designer, founder',
  },
  {
    key: 'organization',
    question: "Got it. Where do you currently work or study?",
    placeholder: 'e.g. Andela, University of Lagos, freelance',
  },
  {
    key: 'experience',
    question: "How would you describe where you are in your journey right now?",
    placeholder: 'Pick one',
    chips: ['Student', 'Early career', 'Mid-level', 'Senior', 'Founder / Leadership'],
  },
  {
    key: 'skills',
    question: "What are your strongest skills — technical or otherwise? List a few, comma-separated.",
    placeholder: 'e.g. React, public speaking, data analysis',
  },
  {
    key: 'interests',
    question: "What are you into outside of just the day job? Tech interests, causes, hobbies — anything.",
    placeholder: 'e.g. AI, open source, basketball',
  },
  {
    key: 'goals',
    question: "What are you hoping to get out of networking here? Pick everything that fits.",
    placeholder: 'Pick all that apply',
    chips: ['friends', 'collaborators', 'mentors', 'co-founders', 'jobs', 'clients', 'learning', 'communities', 'events', 'network growth'],
    multi: true,
  },
  {
    key: 'lookingFor',
    question: "If you could meet one type of person right now, who would that be?",
    placeholder: 'e.g. AI engineers, healthtech founders, design partners',
  },
  {
    key: 'canOffer',
    question: "Last one — what can you offer the people you meet?",
    placeholder: 'e.g. mentorship, code reviews, intros to investors',
  },
  {
    key: 'meetingStyle',
    question: "Do you prefer meeting people remotely, in person, or either?",
    placeholder: 'Pick one',
    chips: ['Remote', 'In person', 'Either'],
  },
];

const VAGUE_FOLLOWUPS: Array<{ test: RegExp; question: string }> = [
  { test: /^ai$|^a\.?i\.?$/i, question: "Nice. What part of AI interests you most — building products, ML research, generative AI, or robotics?" },
  { test: /^tech$|^technology$/i, question: "Cool — any specific corner of tech? Web, mobile, hardware, security, something else?" },
  { test: /^sports?$/i, question: "Got it — which sport, and do you play or just watch?" },
  { test: /^music$/i, question: "Nice — do you make music, or is this more about discovering it?" },
  { test: /^gaming$|^games$/i, question: "What kind of games — competitive, indie, game dev?" },
  { test: /^startups?$/i, question: "Got it — building one, working at one, or just curious about the space?" },
];

export function getVagueFollowUp(answer: string): string | null {
  const trimmed = answer.trim();
  if (trimmed.split(/\s+/).length > 2 && trimmed.length > 8) return null;
  const match = VAGUE_FOLLOWUPS.find((f) => f.test.test(trimmed));
  return match ? match.question : null;
}

function splitList(value: string): string[] {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

function mapExperience(value: string): Experience {
  const v = value.toLowerCase();
  if (v.includes('student')) return 'student';
  if (v.includes('early')) return 'entry';
  if (v.includes('mid')) return 'mid';
  if (v.includes('senior')) return 'senior';
  if (v.includes('founder') || v.includes('leadership')) return 'founder';
  return 'mid';
}

export interface OnboardingAnswers {
  location: string;
  profession: string;
  organization: string;
  experience: string;
  skills: string;
  interests: string;
  goals: string[];
  lookingFor: string;
  canOffer: string;
  meetingStyle: string;
}

export function buildProfileFromAnswers(
  base: { id: string; name: string; avatarUrl: string; bio?: string },
  answers: OnboardingAnswers
): NetworkingProfile {
  const [city, ...rest] = answers.location.split(',').map((s) => s.trim());
  const country = rest.join(', ') || 'Unknown';
  const skills = splitList(answers.skills);
  const interests = splitList(answers.interests);
  const lookingFor = splitList(answers.lookingFor);
  const canOffer = splitList(answers.canOffer);

  return {
    id: base.id,
    name: base.name,
    headline: `${answers.profession} at ${answers.organization}`,
    bio: base.bio || `${answers.profession} interested in ${interests.slice(0, 2).join(' and ') || 'meeting new people'}. Open to ${answers.goals.slice(0, 2).join(' and ') || 'connecting'}.`,
    avatarUrl: base.avatarUrl,
    location: { city: city || 'Unknown', country },
    gender: 'unspecified',
    profession: answers.profession,
    education: [],
    organization: answers.organization,
    experience: mapExperience(answers.experience),
    skills,
    interests,
    goals: answers.goals,
    lookingFor,
    canOffer,
    industries: [],
    networkingPreferences: {
      meetingStyle: answers.meetingStyle.toLowerCase().includes('remote')
        ? 'remote'
        : answers.meetingStyle.toLowerCase().includes('person')
          ? 'in-person'
          : 'either',
      industries: [],
      skillsWanted: [],
      locationPref: 'near-me',
    },
    personalitySignals: [],
    tags: [],
    communities: [],
    events: [],
    isSelf: true,
  };
}

export function profileCompleteness(profile: NetworkingProfile): number {
  const checks = [
    profile.headline?.length > 0,
    profile.bio?.length > 10,
    profile.location.city !== 'Unknown',
    profile.skills.length > 0,
    profile.interests.length > 0,
    profile.goals.length > 0,
    profile.lookingFor.length > 0,
    profile.canOffer.length > 0,
    profile.organization !== undefined && profile.organization.length > 0,
    profile.avatarUrl.length > 0,
  ];
  const passed = checks.filter(Boolean).length;
  return Math.round((passed / checks.length) * 100);
}
