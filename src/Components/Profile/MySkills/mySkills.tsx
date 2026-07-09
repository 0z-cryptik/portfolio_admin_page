import { useMyGlobalState } from "../../../Context/portfolioContext";
import { AddSkillButton } from "./addSkillButton";

export function MySkills() {
  const { profile } = useMyGlobalState();

  return (
    <div className="space-y-4 pt-10">
      <h2 className="text-xl font-bold text-slate-200">
        Programming Languages & Frameworks I Use
      </h2>
      <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap gap-2 text-xl">
        {profile?.skills.map((skill, index) => (
          <span
            key={index}
            className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-md font-mono">
            {skill}
          </span>
        ))}
        <AddSkillButton />
      </div>
    </div>
  );
}
