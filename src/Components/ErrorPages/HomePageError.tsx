import { useMyGlobalState } from "../../Context/portfolioContext";

export function HomePageError() {
    const {error} = useMyGlobalState();
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-red-950/50 border border-red-500/50 text-red-200 p-6 rounded-xl max-w-md text-center">
        <p className="font-bold mb-2">Sync Error</p>
        <p className="text-sm text-red-400">{error}</p>
      </div>
    </div>
  );
}
