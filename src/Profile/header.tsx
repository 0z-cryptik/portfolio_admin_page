import { useMyGlobalState } from "../Context/portfolioContext";

export function Header() {
  const { profile } = useMyGlobalState();

  return (
    <header className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1">
          {profile?.full_name}
        </h1>
        <p className="text-cyan-400 font-medium">{profile?.email}</p>
      </div>
      <button className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-semibold shadow-md shadow-cyan-900/20 transition-all">
        Edit Layout
      </button>
    </header>
  );
}
