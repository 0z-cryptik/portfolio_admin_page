import { useMyGlobalState } from "../../../../Context/portfolioContext";
import { useEditingStateLogic } from "../../../../CustomHooks/editingStateLogicHook";
import { updateBackendData } from "../../../../helperFunctions/upDateBackendData";
import type { ProfileData } from "../../../../Types/customTypes";

export function LinkedIn() {
  const {
    editing,
    loading,
    setLoading,
    setInputValue,
    inputValue,
    setEditing
  } = useEditingStateLogic();

  const { profile, setProfile } = useMyGlobalState();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedprofile = await updateBackendData<ProfileData>(
        `${import.meta.env.VITE_SERVER_URL}/api/profile/1/`,
        { field: "linkedin_url", newValue: inputValue },
        "PUT"
      );
      setProfile(updatedprofile);
    } catch (error) {
      console.error("Failed to update LinkedIn URL:", error);
    } finally {
      setLoading(false);
      setEditing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-slate-500 animate-pulse py-1">
        <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span>Saving...</span>
      </div>
    );
  }

  if (editing) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="url"
          autoFocus
          className="text-xs text-slate-200 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder-slate-600"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors">
          Cancel
        </button>
        <button
          type="submit"
          className="text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 px-3 py-1 rounded-lg transition-colors">
          Save
        </button>
      </form>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-lg text-xs transition-colors">
      <svg className="w-3.5 h-3.5 text-cyan-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
      </svg>

      <a
        href={profile?.linkedin_url}
        target="_blank"
        rel="noreferrer"
        className="text-slate-300 hover:text-cyan-400 truncate max-w-37.5 sm:max-w-50 transition-colors">
        LinkedIn
      </a>

      <button
        type="button"
        onClick={() => {
          setInputValue(profile?.linkedin_url);
          setEditing(true);
        }}
        className="p-0.5 text-slate-500 hover:text-slate-300 rounded transition-colors ml-0.5"
        title="Edit LinkedIn URL">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
  );
}