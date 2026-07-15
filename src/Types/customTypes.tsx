interface ProfileData {
  full_name: string;
  email: string;
  about_me: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  skills: Skills[];
}

interface Skills {
  skill_id: number;
  skill_name: string;
}

interface ProjectData {
  project_id: number;
  title: string;
  description: string;
  repo_link?: string;
  live_link?: string;
  backend_repo?: string;
  show_on_cv?: boolean;
  see_how_it_works: string;
  skills: Skills[];
}

export type { ProfileData, ProjectData };
