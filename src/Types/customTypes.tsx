interface ProfileData {
  full_name: string;
  email: string;
  about_me: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  skills: string[];
}

interface ProjectData {
  project_id: number;
  title: string;
  description: string;
  repo_link?: string;
  live_link?: string;
  skills: string[];
}

export type {ProfileData, ProjectData}