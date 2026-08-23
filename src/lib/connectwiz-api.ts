import { api } from './api-client';
import type { NetworkingProfile, SearchIntent, SearchResultPerson } from './connectwiz-types';

interface BackendSearchResult {
  id: string;
  name: string;
  headline: string;
  avatarUrl: string;
  location: { city: string; country: string };
  profession: string;
  skills: string[];
  interests: string[];
  goals: string[];
  lookingFor: string[];
  matchScore: number;
  reasons: string[];
}

function toNetworkingProfile(dto: BackendSearchResult): NetworkingProfile {
  return {
    id: dto.id,
    name: dto.name,
    headline: dto.headline,
    bio: '',
    avatarUrl: dto.avatarUrl,
    location: dto.location,
    gender: 'unspecified',
    profession: dto.profession,
    education: [],
    organization: '',
    experience: 'mid',
    skills: dto.skills,
    interests: dto.interests,
    goals: dto.goals,
    lookingFor: dto.lookingFor,
    canOffer: [],
    industries: [],
    networkingPreferences: { meetingStyle: 'either', industries: [], skillsWanted: [], locationPref: 'near-me' },
    personalitySignals: [],
    tags: [],
    communities: [],
    events: [],
  };
}

/** Real backend calls for the two demo-critical flows: onboarding persistence
 *  and search. Every function here can throw (network down, Atlas hiccup,
 *  not authenticated) — callers must catch and fall back to the mock layer
 *  so the demo never visibly breaks. */
export const connectwizApi = {
  async completeOnboarding(profile: NetworkingProfile): Promise<void> {
    await api.post('/api/onboarding/complete', {
      headline: profile.headline,
      bio: profile.bio,
      location: { city: profile.location.city, country: profile.location.country, lat: profile.location.lat, lng: profile.location.lng },
      gender: profile.gender,
      profession: profile.profession,
      education: profile.education,
      organization: profile.organization ?? '',
      experience: profile.experience,
      skills: profile.skills,
      interests: profile.interests,
      goals: profile.goals,
      lookingFor: profile.lookingFor,
      canOffer: profile.canOffer,
      industries: profile.industries,
      networkingPreferences: profile.networkingPreferences,
      personalitySignals: profile.personalitySignals,
      tags: profile.tags,
      communities: profile.communities,
      events: profile.events,
    });
  },

  async updateLocation(lat: number, lng: number): Promise<void> {
    await api.patch('/api/onboarding/location', { lat, lng });
  },

  async search(query: string): Promise<{ intent: SearchIntent; results: SearchResultPerson[] }> {
    const data = await api.post<{ intent: SearchIntent; results: BackendSearchResult[] }>('/api/search', { query });
    return {
      intent: data.intent,
      results: data.results.map((r) => ({ profile: toNetworkingProfile(r), matchScore: r.matchScore, reasons: r.reasons })),
    };
  },
};
