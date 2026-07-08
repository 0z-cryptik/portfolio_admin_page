import { useMyGlobalState } from "../Context/portfolioContext";

export function MySkills() {
  const { profile } = useMyGlobalState();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-200">Core Expertise</h2>
      <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap gap-2">
        {profile?.skills.map((skill, index) => (
          <span
            key={index}
            className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-md text-xs font-mono">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
