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

export interface Experience {
  id: string;
  company: {
    [key in Language]: string;
  };
  position: {
    [key in Language]: string;
  };
  period: string;
  description: {
    [key in Language]: string[];
  };
}

export interface SkillCategory {
  title: {
    [key in Language]: string;
  };
  skills: string[];
}

export interface Profile {
  name: {
    [key in Language]: string;
  };
  title: {
    [key in Language]: string;
  };
  bio: {
    [key in Language]: string;
  };
  location: {
    [key in Language]: string;
  };
  email: string;
  socials: {
    linkedin?: string;
    github?: string;
  };
}