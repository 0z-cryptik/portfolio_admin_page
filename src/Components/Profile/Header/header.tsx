import { Email } from "./Email/email";
import { Name } from "./Name/name";
import { useMyGlobalState } from "../../../Context/portfolioContext";
import { LinkedIn } from "./LinkedIn/linkedIn";
import { Github } from "./Github/github";
import { Twitter } from "./Twitter/twitter";

export function Header() {
  const { profile } = useMyGlobalState();

  return (
    <header className="border-b border-slate-800 pb-6">
      <Name />
      <div className="flex flex-col gap-3 mt-3">
        <Email />
        {profile.linkedin_url && <LinkedIn />}
        {profile.github_url && <Github />}
        {profile.twitter_url && <Twitter />}
      </div>
    </header>
  );
}
