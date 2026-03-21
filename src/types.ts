export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  threshold: number; // in days
}

export const BADGES: Badge[] = [
  { id: 'starter', name: 'The Spark', description: 'Start your first streak.', icon: '🔥', threshold: 0 },
  { id: 'week1', name: 'Iron Will', description: 'Maintain a 7-day streak.', icon: '🛡️', threshold: 7 },
  { id: 'month1', name: 'Steel Soul', description: 'Maintain a 30-day streak.', icon: '⚔️', threshold: 30 },
  { id: 'day90', name: 'Legendary', description: 'Maintain a 90-day streak.', icon: '👑', threshold: 90 },
  { id: 'year1', name: 'Immortal', description: 'Maintain a 365-day streak.', icon: '🌌', threshold: 365 },
];

export interface Streak {
  id: string;
  userId: string;
  startDate: number;
  endDate?: number;
  status: 'active' | 'relapsed';
  relapseReason?: string;
  duration: number; // in ms
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: number;
  longestStreak: number;
  totalRelapses: number;
  badges: string[];
}

export interface CommunityPost {
  id: string;
  userId: string;
  username: string;
  content: string;
  streakDays: number;
  likes: string[];
  createdAt: number;
}
