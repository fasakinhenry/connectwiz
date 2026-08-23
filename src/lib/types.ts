export interface StreakMeUser {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl: string;
  bio?: string;
  provider: 'local' | 'google' | 'linkedin';
  emailVerified: boolean;
  createdAt: string;
  stats?: {
    currentStreak: number;
    totalXp: number;
    following: number;
    followers: number;
  };
}

export interface AuthResponse {
  user: StreakMeUser;
  accessToken: string;
}
