export interface HealthStat {
  label: string;
  value: string;
  change?: string;
  description?: string;
}

export interface Report {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  image: string;
  link: string;
}

export interface ChartData {
  name: string;
  value: number;
  secondary?: number;
}
