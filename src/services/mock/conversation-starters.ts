import type { NetworkingProfile } from '@/lib/connectwiz-types';

function overlap(a: string[], b: string[]) {
  const setB = new Set(b.map((x) => x.toLowerCase()));
  return a.filter((x) => setB.has(x.toLowerCase()));
}

export function getSharedAttributes(me: NetworkingProfile | null, them: NetworkingProfile) {
  if (!me) return { interests: [], skills: [], goals: [], sameCity: false };
  return {
    interests: overlap(them.interests, me.interests),
    skills: overlap(them.skills, me.skills),
    goals: overlap(them.goals, me.goals),
    sameCity: me.location.city === them.location.city,
  };
}

export function getConversationStarters(me: NetworkingProfile | null, them: NetworkingProfile): string[] {
  const shared = getSharedAttributes(me, them);
  const starters: string[] = [];
  const firstName = them.name.split(' ')[0];

  if (shared.interests.length) {
    starters.push(`Hey ${firstName}! Noticed we're both into ${shared.interests[0]} — what are you working on there right now?`);
  }
  if (shared.skills.length) {
    starters.push(`Hi ${firstName}, saw you also work with ${shared.skills[0]}. Would love to compare notes sometime.`);
  }
  if (shared.sameCity) {
    starters.push(`Hey ${firstName}! Fellow ${them.location.city}-based person here — open to grabbing coffee sometime?`);
  }
  if (them.lookingFor.length) {
    starters.push(`Hi ${firstName}! I saw you're looking for ${them.lookingFor[0]} — I might be able to help, or at least point you somewhere useful.`);
  }
  if (!starters.length) {
    starters.push(`Hi ${firstName}! Your profile caught my eye — "${them.headline}". Would love to connect.`);
  }

  return starters.slice(0, 2);
}
