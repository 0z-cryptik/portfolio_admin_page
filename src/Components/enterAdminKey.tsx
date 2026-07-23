import { useState } from "react";
import { useMyGlobalState } from "../Context/portfolioContext";

export function AdminPasskeyModal() {
  const [keyInput, setKeyInput] = useState("");
  const [error, setError] = useState(false);
  const { setAdminTokenSet } = useMyGlobalState();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = keyInput.trim();

    if (!token || token !== import.meta.env.VITE_ADMIN_SECRET) {
      setError(true);
      return;
    }

    try {
      localStorage.setItem("admin_token", token);
      setAdminTokenSet(true);
    } catch {
      console.error("Error saving token to local storage");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl">
        <h2 className="text-lg font-bold text-slate-100 mb-5">
          Admin Access Required
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Paste your ADMIN_SECRET key..."
              value={keyInput}
              onChange={(e) => {
                setKeyInput(e.target.value);
                setError(false);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
            />
            {error && (
              <p className="text-xs text-rose-400 mt-1">
                Please enter a valid key.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs py-2 rounded-lg transition-colors">
            Save Key & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
