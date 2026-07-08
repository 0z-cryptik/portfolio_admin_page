import type { ProjectData } from "../../Types/customTypes";

export function ProjectLinks({ project }: { project: ProjectData }) {
  return (
    <div className="flex items-center gap-4 pt-1">
      {project.repo_link && (
        <a
          href={project.repo_link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center text-xs text-slate-400 hover:text-white font-medium transition-colors">
          Code <span className="ml-1">→</span>
        </a>
      )}

      {project.live_link && (
        <a
          href={project.live_link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
          Live Demo <span className="ml-1 text-[10px] opacity-70">↗</span>
        </a>
      )}
    </div>
  );
}
