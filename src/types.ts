export interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  isFavorite?: boolean;
}

export interface Story {
  id: string;
  author: string;
  content: string;
  type: 'written' | 'video';
  videoUrl?: string;
  timestamp: string;
}

export interface PositiveVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

export interface SupportService {
  id: string;
  name: string;
  type: 'Shelter' | 'Legal' | 'Counseling' | 'Health';
  contact: string;
  location: string;
  description: string;
}

export interface UserSettings {
  nickname: string;
  language: string;
  country: string;
  onboarded: boolean;
  highContrast: boolean;
  largeText: boolean;
  notificationsEnabled: boolean;
  quickExitRedirect: string;
  theme?: 'default' | 'lilac' | 'light-blue' | 'light-green';
}

export interface Note {
  id: string;
  timestamp: string;
  content: string;
  type: 'Note' | 'Incident';
}

export interface Incident {
  id: string;
  type: string;
  date: string;
  time: string;
  location: string;
  description: string;
  urgency: 'Low' | 'Medium' | 'High';
  timestamp: string;
}

export interface CustomEmergencyNumber {
  id: string;
  label: string;
  number: string;
}
