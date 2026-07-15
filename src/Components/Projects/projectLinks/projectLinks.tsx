import type { ProjectData } from "../../../Types/customTypes";
import { BackendRepo } from "./backend_repo";
import { LiveLink } from "./liveLink";
import { RepoLink } from "./repoLink";
import { SeeHowItWorks } from "./see_how_it_works";

export function ProjectLinks({ project }: { project: ProjectData }) {
  return (
    <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-slate-800/60">
      {project.repo_link && <RepoLink project={project} />}

      {project.live_link && <LiveLink project={project} />}

      {project.backend_repo && <BackendRepo project={project} />}

      {project.see_how_it_works && <SeeHowItWorks project={project} />}
    </div>
  );
}
