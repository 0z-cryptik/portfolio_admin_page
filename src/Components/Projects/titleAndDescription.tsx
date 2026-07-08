import type { ProjectData } from "../../Types/customTypes";

export function TitleAndDescription({
  project
}: {
  project: ProjectData;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-slate-400 text-sm">
        {project.description}
      </p>
    </div>
  );
}
