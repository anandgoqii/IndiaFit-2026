import { HealthStat, Report, NewsItem, ChartData } from './types';

export const HERO_STATS: HealthStat[] = [
  { label: "Total Steps Tracked", value: "15.4 Trillion", description: "Across India in 2026" },
  { label: "Active Users", value: "50M+", description: "Health-conscious Indians" },
  { label: "Cities Covered", value: "500+", description: "Pan-India data intelligence" },
];

export const STEP_COUNT_DATA: ChartData[] = [
  { name: '2020', value: 4500 },
  { name: '2021', value: 5200 },
  { name: '2022', value: 6100 },
  { name: '2025', value: 6800 },
  { name: '2026', value: 7400 },
];

export const HYPERTENSION_DATA: ChartData[] = [
  { name: 'Urban', value: 32 },
  { name: 'Rural', value: 24 },
];

export const LIFESTYLE_DATA: ChartData[] = [
  { name: 'Active', value: 45 },
  { name: 'Sedentary', value: 35 },
  { name: 'Semi-Active', value: 20 },
];

export const REPORTS: Report[] = [
  {
    id: '1',
    title: 'India Fit Report 2026',
    category: 'Annual Report',
    description: 'The most comprehensive study on India\'s health trends, activity levels, and chronic disease prevalence.',
    image: 'https://picsum.photos/seed/report1/800/600',
    link: '#'
  },
  {
    id: '2',
    title: 'The Cancer Impact Study',
    category: 'Special Report',
    description: 'Analyzing the rising incidence of cancer in urban India and the role of preventive screenings.',
    image: 'https://picsum.photos/seed/report2/800/600',
    link: '#'
  },
  {
    id: '3',
    title: 'Mental Health in Corporate India',
    category: 'Insights',
    description: 'A deep dive into workplace stress, burnout, and the growing need for mental wellness programs.',
    image: 'https://picsum.photos/seed/report3/800/600',
    link: '#'
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    title: 'IndiaFit 2026: Urban India walks 20% more than Rural India',
    source: 'The Economic Times',
    date: 'Mar 15, 2026',
    image: 'https://picsum.photos/seed/news1/400/300',
    link: '#'
  },
  {
    id: '2',
    title: 'Preventive healthcare is the future of India\'s medical ecosystem',
    source: 'Forbes India',
    date: 'Feb 28, 2026',
    image: 'https://picsum.photos/seed/news2/400/300',
    link: '#'
  },
  {
    id: '3',
    title: 'How data intelligence is helping fight chronic diseases',
    source: 'TechCrunch',
    date: 'Jan 10, 2026',
    image: 'https://picsum.photos/seed/news3/400/300',
    link: '#'
  },
  {
    id: '4',
    title: 'GOQii\'s IndiaFit report highlights rising hypertension among youth',
    source: 'Hindustan Times',
    date: 'Dec 05, 2023',
    image: 'https://picsum.photos/seed/news4/400/300',
    link: '#'
  }
];

export const ECOSYSTEM_LOGOS = [
  { name: 'GOQii', logo: 'https://appcdn.goqii.com/storeimg/26196_1775133308.png' },
  { name: 'Fit India', logo: 'https://appcdn.goqii.com/storeimg/29830_1775133366.png' },
];
