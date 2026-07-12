import type { ProjectData } from "../../Types/customTypes";

export function ProjectSkills({ project }: { project: ProjectData }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {project.skills && project.skills.length > 0 ? (
        project.skills.map((tech, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 rounded text-[11px] font-mono">
            {tech}
          </span>
        ))
      ) : (
        <span className="text-xs text-slate-600 italic">
          No tags associated
        </span>
      )}
    </div>
  );
}
