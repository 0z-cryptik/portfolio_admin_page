import { useMyGlobalState } from "../../../../Context/portfolioContext";
import { useEditingStateLogic } from "../../../../CustomHooks/editingStateLogicHook";
import { updateBackendData } from "../../../../helperFunctions/upDateBackendData";
import type { ProfileData } from "../../../../Types/customTypes";

export function Email() {
  const {
    editing,
    loading,
    setLoading,
    setInputValue,
    inputValue,
    setEditing
  } = useEditingStateLogic();

  const { profile, setProfile } = useMyGlobalState();

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedprofile = await updateBackendData<ProfileData>(
        "http://localhost:3000/api/profile/1/",
        { field: "email", newValue: inputValue },
        "PUT"
      );
      setProfile(updatedprofile);
    } catch (error) {
      console.error("Failed to update email:", error);
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
      <form onSubmit={handleEmailSubmit} className="flex items-center gap-2">
        <input
          type="email"
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
      <svg className="w-3.5 h-3.5 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>

      <a
        href={`mailto:${profile.email}`}
        className="text-cyan-400 hover:underline font-medium transition-colors">
        {profile.email}
      </a>

      <button
        type="button"
        onClick={() => {
          setInputValue(profile.email);
          setEditing(true);
        }}
        className="p-0.5 text-slate-500 hover:text-slate-300 rounded transition-colors ml-0.5"
        title="Edit email">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
  );
}