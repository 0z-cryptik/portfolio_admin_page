import { useMyGlobalState } from "../../Context/portfolioContext";
import { ProjectLinks } from "./projectLinks";
import { ProjectSkills } from "./projectSkills";
import { TitleAndDescription } from "./titleAndDescription";

export function Projects() {
  const { projects } = useMyGlobalState();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div
          key={project.project_id}
          className="bg-slate-800/40 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all group">
          <TitleAndDescription project={project} />

          <div className="mt-6 pt-4 border-t border-slate-800/60 space-y-4">
            <ProjectSkills project={project} />
            <ProjectLinks project={project} />
          </div>
        </div>
      ))}
    </div>
  );
}
