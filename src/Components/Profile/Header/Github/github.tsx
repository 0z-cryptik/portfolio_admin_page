import { useMyGlobalState } from "../../../../Context/portfolioContext";
import { useEditingStateLogic } from "../../../../CustomHooks/editingStateLogicHook";
import { updateBackendData } from "../../../../helperFunctions/upDateBackendData";
import type { ProfileData } from "../../../../Types/customTypes";

export function Github() {
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
        { field: "github_url", newValue: inputValue },
        "PUT"
      );
      setProfile(updatedprofile);
    } catch (error) {
      console.error("Failed to update GitHub URL:", error);
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
      <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>

      <a
        href={profile?.github_url}
        target="_blank"
        rel="noreferrer"
        className="text-slate-300 hover:text-cyan-400 truncate max-w-37.5 sm:max-w-50 transition-colors">
        GitHub
      </a>

      <button
        type="button"
        onClick={() => {
          setInputValue(profile?.github_url ?? "");
          setEditing(true);
        }}
        className="p-0.5 text-slate-500 hover:text-slate-300 rounded transition-colors ml-0.5"
        title="Edit GitHub URL">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
  );
}