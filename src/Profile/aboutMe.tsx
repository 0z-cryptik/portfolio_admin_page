import { useMyGlobalState } from "../Context/portfolioContext";

export function AboutMe() {
  const { profile } = useMyGlobalState();

  return (
    <div className="md:col-span-2 space-y-4">
      <h2 className="text-xl font-bold text-slate-200">About Me</h2>
      <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <p className="text-slate-300 leading-relaxed whitespace-pre-line">
          {profile?.about_me}
        </p>
      </div>
    </div>
  );
}
