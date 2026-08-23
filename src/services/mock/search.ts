import type { Gender, NetworkingProfile, SearchIntent, SearchResultPerson } from '@/lib/connectwiz-types';
import { SEED_PEOPLE } from './seed-people';

const STOPWORDS = new Set([
  'i', 'im', 'am', 'a', 'an', 'the', 'of', 'in', 'on', 'at', 'to', 'into', 'for', 'with', 'and', 'or',
  'who', 'are', 'is', 'that', 'my', 'me', 'can', 'you', 'help', 'please', 'someone', 'people', 'person',
  'want', 'need', 'find', 'looking', 'like', 'near', 'around', 'local', 'nearby', 'what', 'whats', 'hi',
  'hello', 'hey', 'how', 'doing', 'today',
]);

const MULTI_WORD_SYNONYMS: Array<[string, 'skill' | 'interest' | 'goal', string]> = [
  ['machine learning', 'skill', 'Machine Learning'],
  ['data science', 'skill', 'Data Science'],
  ['full stack', 'skill', 'Software Development'],
  ['front end', 'skill', 'React'],
  ['back end', 'skill', 'Backend Engineering'],
  ['generative ai', 'interest', 'Generative AI'],
  ['artificial intelligence', 'interest', 'AI'],
  ['open source', 'interest', 'Open Source'],
  ['co founder', 'goal', 'co-founders'],
  ['co founders', 'goal', 'co-founders'],
];

const SKILL_SYNONYMS: Record<string, string> = {
  developer: 'Software Development', developers: 'Software Development', development: 'Software Development',
  dev: 'Software Development', coder: 'Software Development', coding: 'Software Development',
  programmer: 'Software Development', engineer: 'Software Development', engineering: 'Software Development',
  frontend: 'React', react: 'React', backend: 'Backend Engineering', fullstack: 'Software Development',
  designer: 'UI Design', design: 'UI Design', ux: 'UX Research', ui: 'UI Design',
  robotics: 'Robotics', robot: 'Robotics', security: 'Cybersecurity', cybersecurity: 'Cybersecurity',
  hacker: 'Cybersecurity', hacking: 'Cybersecurity', ml: 'Machine Learning', data: 'Data Science',
  product: 'Product Strategy', fundraising: 'Fundraising',
};

const INTEREST_SYNONYMS: Record<string, string> = {
  ai: 'AI', genai: 'Generative AI', startup: 'Startups', startups: 'Startups',
  entrepreneurship: 'Startups', health: 'Healthcare', healthcare: 'Healthcare', healthtech: 'Healthcare',
  fintech: 'Fintech', finance: 'Fintech', opensource: 'Open Source', hardware: 'Hardware',
  research: 'Research', sports: 'Sports', gaming: 'Gaming', music: 'Music', art: 'Creative', creative: 'Creative',
};

const GOAL_SYNONYMS: Record<string, string> = {
  mentor: 'mentors', mentors: 'mentors', mentee: 'mentees', mentees: 'mentees',
  cofounder: 'co-founders', cofounders: 'co-founders', job: 'jobs', jobs: 'jobs', hire: 'jobs', hiring: 'jobs',
  client: 'clients', clients: 'clients', friend: 'friends', friends: 'friends', learn: 'learning',
  learning: 'learning', collaborator: 'collaborators', collaborators: 'collaborators', collaborate: 'collaborators',
};

function normalize(query: string) {
  return query.toLowerCase().replace(/[^\p{L}\p{N}\s'-]/gu, ' ').replace(/\s+/g, ' ').trim();
}

export function parseSearchIntent(rawQuery: string): SearchIntent {
  const q = normalize(rawQuery);
  const words = q.split(' ').filter(Boolean);

  let gender: Gender | undefined;
  if (/\b(female|women|woman)\b/.test(q)) gender = 'female';
  else if (/\b(male|men)\b/.test(q) && !/\bwomen\b/.test(q)) gender = 'male';

  const location = /\b(near me|around me|nearby|close by|in my area|local)\b/.test(q) ? ('near_me' as const) : undefined;

  const skills = new Set<string>();
  const interests = new Set<string>();
  const goals = new Set<string>();
  const consumed = new Set<number>();

  for (const [phrase, type, canonical] of MULTI_WORD_SYNONYMS) {
    if (q.includes(phrase)) {
      if (type === 'skill') skills.add(canonical);
      if (type === 'interest') interests.add(canonical);
      if (type === 'goal') goals.add(canonical);
      phrase.split(' ').forEach((w) => {
        const idx = words.indexOf(w);
        if (idx >= 0) consumed.add(idx);
      });
    }
  }

  const keywords: string[] = [];
  words.forEach((word, i) => {
    if (consumed.has(i) || STOPWORDS.has(word)) return;
    let matched = false;
    if (SKILL_SYNONYMS[word]) { skills.add(SKILL_SYNONYMS[word]); matched = true; }
    if (INTEREST_SYNONYMS[word]) { interests.add(INTEREST_SYNONYMS[word]); matched = true; }
    if (GOAL_SYNONYMS[word]) { goals.add(GOAL_SYNONYMS[word]); matched = true; }
    if (!matched && word.length > 2) keywords.push(word);
  });

  const supported = Boolean(gender || location || skills.size || interests.size || goals.size || keywords.length > 0);

  return {
    supported,
    rawQuery,
    location,
    gender,
    skills: [...skills],
    interests: [...interests],
    goals: [...goals],
    keywords,
  };
}

function overlap(a: string[], b: string[]) {
  const setB = new Set(b.map((x) => x.toLowerCase()));
  return a.filter((x) => setB.has(x.toLowerCase()));
}

function clampScore(raw: number) {
  return Math.max(38, Math.min(97, Math.round(30 + raw * 0.5)));
}

/** Great-circle distance in km — used for real "near me" matching once we have coordinates. */
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Every field a fuzzy topical keyword (e.g. "fashion") could plausibly match against. */
function searchableFields(profile: NetworkingProfile): string[] {
  return [
    profile.headline,
    profile.bio,
    profile.profession,
    ...profile.skills,
    ...profile.interests,
    ...profile.goals,
    ...profile.canOffer,
    ...profile.lookingFor,
    ...profile.industries,
    ...profile.tags,
  ];
}

export function searchPeople(intent: SearchIntent, me: NetworkingProfile | null): SearchResultPerson[] {
  const results: SearchResultPerson[] = [];

  for (const profile of SEED_PEOPLE) {
    if (intent.gender && profile.gender !== intent.gender) continue;

    let raw = 0;
    const reasons: string[] = [];

    if (intent.location === 'near_me' && me) {
      const bothHaveCoords = me.location.lat != null && me.location.lng != null && profile.location.lat != null && profile.location.lng != null;
      if (bothHaveCoords) {
        const km = distanceKm(
          { lat: me.location.lat!, lng: me.location.lng! },
          { lat: profile.location.lat!, lng: profile.location.lng! }
        );
        if (km <= 60) {
          raw += 20;
          reasons.push(km < 5 ? 'Right around the corner from you' : `About ${Math.round(km)}km away`);
        }
      } else if (profile.location.city === me.location.city) {
        raw += 20;
        reasons.push(`Located near you in ${profile.location.city}`);
      }
    }

    intent.skills.forEach((skill) => {
      if (profile.skills.includes(skill)) {
        raw += 20;
        reasons.push(`Skilled in ${skill}`);
      }
    });

    intent.interests.forEach((interest) => {
      if (profile.interests.includes(interest)) {
        raw += 25;
        reasons.push(`Into ${interest}, just like you searched for`);
      }
    });

    intent.goals.forEach((goal) => {
      if (profile.goals.includes(goal)) {
        raw += 20;
        reasons.push(`Also looking for ${goal}`);
      }
    });

    if (intent.keywords.length) {
      const fields = searchableFields(profile).map((f) => f.toLowerCase());
      intent.keywords.forEach((kw) => {
        const hit = fields.some((f) => f.includes(kw) || (f.length >= 4 && kw.includes(f)));
        if (hit) {
          raw += 18;
          reasons.push(`Relates to "${kw}"`);
        }
      });
    }

    if (me) {
      const sharedInterests = overlap(profile.interests, me.interests);
      const sharedSkills = overlap(profile.skills, me.skills);
      const sharedGoals = overlap(profile.goals, me.goals);
      if (sharedInterests.length) { raw += 15; reasons.push(`Both interested in ${sharedInterests[0]}`); }
      if (sharedSkills.length) { raw += 10; reasons.push(`Shares your ${sharedSkills[0]} skill`); }
      if (sharedGoals.length) raw += 8;
      if (me.location.city === profile.location.city) { raw += 5; reasons.push('Based in the same city as you'); }
    }

    if (intent.gender) raw += 8;
    if (raw <= 0) continue;

    results.push({ profile, matchScore: clampScore(raw), reasons: [...new Set(reasons)].slice(0, 3) });
  }

  return results.sort((a, b) => b.matchScore - a.matchScore);
}
