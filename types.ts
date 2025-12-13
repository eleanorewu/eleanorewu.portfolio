export type Language = 'zh' | 'en';

export type Theme = 'light' | 'dark';

export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  period?: string;
  role: {
    [key in Language]: string;
  };
  description: {
    [key in Language]: string;
  };
  details: {
    [key in Language]: string[];
  };
  techStack: string[];
  link?: string;
}