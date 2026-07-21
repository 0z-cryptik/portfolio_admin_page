import { Email } from "./Email/email";
import { Name } from "./Name/name";
import { useMyGlobalState } from "../../../Context/portfolioContext";
import { LinkedIn } from "./LinkedIn/linkedIn";
import { Github } from "./Github/github";
import { Twitter } from "./Twitter/twitter";

export function Header() {
  const { profile } = useMyGlobalState();

  return (
    <header className="border-b border-slate-800/80 pb-6 pt-2">
      <Name />
      
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