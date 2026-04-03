import { SupportService, Story, PositiveVideo, CallCenterContact } from './types';

export const MOCK_SERVICES: SupportService[] = [
  {
    id: '7',
    name: 'DSVRT Lagos',
    type: 'Legal',
    contact: '08000333333',
    location: 'Lagos State, Nigeria',
    description: 'Lagos State Domestic and Sexual Violence Response Team. Providing legal, medical, and psychological support.'
  },
  {
    id: '8',
    name: 'WARIF Nigeria',
    type: 'Health',
    contact: '+2348092100009',
    location: 'Lagos, Nigeria',
    description: 'Women at Risk International Foundation. Specialized care for survivors of sexual violence and abuse.'
  },
  {
    id: '9',
    name: 'Project Alert',
    type: 'Counseling',
    contact: '+2348052096701',
    location: 'Lagos, Nigeria',
    description: 'NGO providing shelter, counseling, and legal aid to women and girls victims of violence.'
  },
  {
    id: '10',
    name: 'FIDA Nigeria',
    type: 'Legal',
    contact: '+2347088496115',
    location: 'Abuja/Lagos, Nigeria',
    description: 'International Federation of Women Lawyers. Providing free legal services to women and children.'
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

export const LIFE_COACHES: CallCenterContact[] = [
  { name: 'Mr. Alex', phone: '+2349032799212' },
  { name: 'Miss Nnenna', phone: '+2348063498112' },
  { name: 'Mr. Innocent', phone: '+2347069721871' },
  { name: 'Miss Sekinat', phone: '+447300465487' },
  { name: 'Miss Chidinma', phone: '+2349032455620' }
];

export const THERAPISTS: CallCenterContact[] = [
  { name: 'Dr. Arinze', phone: '+2345557777', specialty: 'Trauma Specialist' },
  { name: 'Dr. Sarah', phone: '+2345558888', specialty: 'Family Therapist' },
  { name: 'Dr. Emeka', phone: '+2345559999', specialty: 'Clinical Psychologist' }
];

export const DV_ORGANIZATIONS_NIGERIA: CallCenterContact[] = [
  { name: 'DSVRT Lagos', phone: '08000333333', type: 'Government/NGO' },
  { name: 'WARIF Nigeria', phone: '+2348092100009', type: 'NGO' },
  { name: 'Project Alert', phone: '+2348052096701', type: 'NGO' },
  { name: 'FIDA Nigeria', phone: '+2347088496115', type: 'Legal' }
];
