import { useState, useEffect } from 'react';

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
  live_link?: string; // 1. Added live_link optional property to our interface
  tech_stack: string[];
}

export default function App() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          fetch('http://localhost:3000/api/profile/1'),
          fetch('http://localhost:3000/api/profile/1/projects')
        ]);

        if (!profileRes.ok || !projectsRes.ok) {
          throw new Error('Failed to fetch data from backend endpoints.');
        }

        const profileData: ProfileData = await profileRes.json();
        const projectsData: ProjectData[] = await projectsRes.json();

        setProfile(profileData);
        setProjects(projectsData);
      } catch (err: any) {
        console.error('Data loading error:', err);
        setError(err.message || 'Failed to sync with API database.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-950/50 border border-red-500/50 text-red-200 p-6 rounded-xl max-w-md text-center">
          <p className="font-bold mb-2">Sync Error</p>
          <p className="text-sm text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 sm:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Profile Header */}
        <header className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1">
              {profile?.full_name}
            </h1>
            <p className="text-cyan-400 font-medium">{profile?.email}</p>
          </div>
          <button className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-semibold shadow-md shadow-cyan-900/20 transition-all">
            Edit Layout
          </button>
        </header>

        {/* Profile Core Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-slate-200">About Me</h2>
            <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <p className="text-slate-300 leading-relaxed whitespace-pre-line">{profile?.about_me}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-200">Core Expertise</h2>
            <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap gap-2">
              {profile?.skills.map((skill, index) => (
                <span key={index} className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-md text-xs font-mono">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Matrix */}
        <div className="space-y-6 pt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white tracking-tight">Active Portfolio Projects</h2>
            <span className="px-2.5 py-0.5 bg-slate-800 text-slate-400 rounded-full text-xs font-medium border border-slate-700">
              {projects.length} Total
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div 
                key={project.project_id} 
                className="bg-slate-800/40 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all group"
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 space-y-4">
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech_stack && project.tech_stack.length > 0 ? (
                      project.tech_stack.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-0.5 bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 rounded text-[11px] font-mono"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-600 italic">No tags associated</span>
                    )}
                  </div>

                  {/* 2. Double Links Footer Layout */}
                  <div className="flex items-center gap-4 pt-1">
                    {project.repo_link && (
                      <a 
                        href={project.repo_link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center text-xs text-slate-400 hover:text-white font-medium transition-colors"
                      >
                        Code <span className="ml-1">→</span>
                      </a>
                    )}

                    {project.live_link && (
                      <a 
                        href={project.live_link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                      >
                        Live Demo <span className="ml-1 text-[10px] opacity-70">↗</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}