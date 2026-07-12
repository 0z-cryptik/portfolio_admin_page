import { useMyGlobalState } from "../../Context/portfolioContext";
import { ProjectLinks } from "./projectLinks";
import { ProjectSkills } from "./projectSkills";
import { ProjectTitle } from "./title";
import { ProjectDescription } from "./description";

export function Projects() {
  const { projects } = useMyGlobalState();

  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <div
          key={project.project_id}
          className="bg-slate-800/40 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all group">
          <div className="space-y-3">
            <ProjectTitle project={project} />
            <ProjectDescription project={project} />
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/60 space-y-4">
            <ProjectSkills project={project} />
            <ProjectLinks project={project} />
          </div>
        </div>
      ))}
    </div>
  );
}
