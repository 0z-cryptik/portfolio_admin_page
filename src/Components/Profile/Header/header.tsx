import { Email } from "./Email/email";
import { Name } from "./Name/name";
import { useMyGlobalState } from "../../../Context/portfolioContext";
import { LinkedIn } from "./LinkedIn/linkedIn";
import { Github } from "./Github/github";
import { Twitter } from "./Twitter/twitter";
import { DownloadCVButton } from "../../Resume/downloadResume";

export function Header() {
  const { profile, projects } = useMyGlobalState();

  return (
    <header className="border-b border-slate-800/80 pb-6 pt-2">
      {/* Top Row: Stacks vertically on mobile, row on sm screens */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <Name />
        </div>
        
        {profile && projects && (
          <div className="shrink-0 self-start sm:self-auto">
            <DownloadCVButton profile={profile} projects={projects} />
          </div>
        )}
      </div>
      
      {/* Contact & Social Links Bar */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <Email />
        {profile?.github_url && <Github />}
        {profile?.linkedin_url && <LinkedIn />}
        {profile?.twitter_url && <Twitter />}
      </div>
    </header>
  );
}