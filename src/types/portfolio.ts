export interface SocialLink {
  platform: 'GitHub' | 'LinkedIn' | 'Email';
  url: string;
  handle: string;
  iconName: string;
  disabled?: boolean;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  completionYear: number;
  status: 'Completed';
  highlights: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  duration: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface CertificationItem {
  name: string;
  code: string;
  fullName: string;
  issuer: 'ServiceNow';
  status: 'Active';
  skillsCovered: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Desktop App' | 'Backend / Bot' | 'Systems / C++' | 'Web Engineering';
  language: 'Python' | 'Python / Django' | 'C++' | 'JavaScript / Node.js' | 'TypeScript / React' | string;
  description: string;
  technicalDetails: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  tags: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Proficient' | 'Familiar';
    iconName?: string;
  }[];
}

export interface PortfolioData {
  personal: {
    name: string;
    headline: string;
    bio: string;
    location: string;
    email: string;
    githubUsername: string;
    experienceYears: string;
    status: string;
    resumePdfPath: string;
  };
  experience: ExperienceItem[];
  certifications: CertificationItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  socials: SocialLink[];
}
