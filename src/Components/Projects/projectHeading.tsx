import { useMyGlobalState } from "../../Context/portfolioContext";

export function ProjectsHeading() {
  const { projects } = useMyGlobalState();

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white tracking-tight">
        Active Portfolio Projects
      </h2>
      <span className="px-2.5 py-0.5 bg-slate-800 text-slate-400 rounded-full text-xs font-medium border border-slate-700">
        {projects.length} Total
      </span>
    </div>
  );
}
