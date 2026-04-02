import { SupportService, Story, PositiveVideo } from './types';

export const MOCK_SERVICES: SupportService[] = [
  {
    id: '1',
    name: 'Safe Haven Shelter',
    type: 'Shelter',
    contact: '1-800-SAFE',
    location: 'Downtown Area',
    description: 'Emergency housing and 24/7 support for survivors.'
  },
  {
    id: '2',
    name: 'Justice Legal Aid',
    type: 'Legal',
    contact: '555-0123',
    location: 'Legal District',
    description: 'Free legal representation and advice for protection orders.'
  },
  {
    id: '3',
    name: 'Healing Hearts Counseling',
    type: 'Counseling',
    contact: '555-4567',
    location: 'Wellness Center',
    description: 'Trauma-informed therapy and support groups.'
  },
  {
    id: '4',
    name: 'Community Health Clinic',
    type: 'Health',
    contact: '555-9999',
    location: 'East Side',
    description: 'Confidential medical care and forensic exams.'
  },
  {
    id: '5',
    name: 'Coach Sarah - Life Coach',
    type: 'Counseling',
    contact: '555-8888',
    location: 'Online/Remote',
    description: 'Empowerment coaching and life transition support for survivors.'
  },
  {
    id: '6',
    name: 'Dr. Arinze - Trauma Therapist',
    type: 'Counseling',
    contact: '555-7777',
    location: 'Lagos Wellness Hub',
    description: 'Specialized clinical therapy for domestic violence recovery.'
  }
];

export const SURVIVOR_STORIES: Story[] = [
  {
    id: 's1',
    author: 'Amina',
    content: 'I finally found the strength to leave. It was the hardest thing I ever did, but the best decision for my children and me.',
    type: 'written',
    timestamp: '2 days ago'
  },
  {
    id: 's2',
    author: 'John',
    content: 'Men can be victims too. Finding Mauntra helped me realize I wasn\'t alone and that there is a way out.',
    type: 'written',
    timestamp: '1 week ago'
  },
  {
    id: 's3',
    author: 'Sarah',
    content: 'Recovery is a journey, not a destination. Every day is a step towards healing.',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    timestamp: '3 days ago'
  }
];

export const POSITIVE_VIDEOS: PositiveVideo[] = [
  {
    id: 'v1',
    title: 'Daily Affirmations for Strength',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/seed/strength/400/225'
  },
  {
    id: 'v2',
    title: 'Finding Your Inner Peace',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/seed/peace/400/225'
  }
];

export const EMERGENCY_INFO: Record<string, { hotline: string; nationalHotline: string; textHotline: string }> = {
  'Nigeria': {
    hotline: '112',
    nationalHotline: '0800-333-3333',
    textHotline: 'Text HELP to 112'
  },
  'United States': {
    hotline: '911',
    nationalHotline: '1-800-799-SAFE (7233)',
    textHotline: 'Text "START" to 88788'
  },
  'United Kingdom': {
    hotline: '999',
    nationalHotline: '0808 2000 247',
    textHotline: 'Text 80999'
  },
  'Global': {
    hotline: '112',
    nationalHotline: '1-800-799-SAFE',
    textHotline: 'Search local help'
  }
};
