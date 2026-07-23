import { useMyGlobalState } from "../../Context/portfolioContext";
import { updateBackendData } from "../../helperFunctions/upDateBackendData";
import { useEditingStateLogic } from "../../CustomHooks/editingStateLogicHook";
import type { ProfileData } from "../../Types/customTypes";

export function AboutMe() {
  const { profile, setProfile } = useMyGlobalState();
  const {
    loading,
    setLoading,
    editing,
    setEditing,
    inputValue,
    setInputValue
  } = useEditingStateLogic();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedProfile = await updateBackendData<ProfileData>(
        `${import.meta.env.VITE_SERVER_URL}/api/profile/1/`,
        { field: "about_me", newValue: inputValue },
        "PUT"
      );
      setProfile(updatedProfile);
    } catch (error) {
      console.error("Failed to update About Me bio:", error);
    } finally {
      setLoading(false);
      setEditing(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-3 border-b border-slate-800/80 pb-6 pt-2">
        <h2 className="text-base md:text-xl font-bold text-slate-200">About Me</h2>
        <div className="w-full text-xs text-slate-500 animate-pulse py-2 flex items-center gap-2">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Updating bio...</span>
        </div>
      </div>
    );
  }

  if (editing) {
    return (
      <div className="space-y-3 border-b border-slate-800/80 pb-6 pt-2">
        <h2 className="text-base md:text-xl font-bold text-slate-200">About Me</h2>
        <form onSubmit={handleSubmit} className="w-full min-w-0 flex flex-col gap-2.5">
          <textarea
            autoFocus
            rows={5}
            placeholder="Tell your story..."
            className="w-full text-xs md:text-sm text-slate-200 bg-slate-900 border border-slate-700 rounded-lg p-3 leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder-slate-600 min-h-[120px]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              className="text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 px-3.5 py-1.5 rounded-lg transition-colors shadow-sm">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-3 border-b border-slate-800/80 pb-6 pt-2">
      {/* Header Bar with section title & persistent edit button */}
      <div className="flex items-center justify-between">
        <h2 className="text-base md:text-xl font-bold text-slate-200">About Me</h2>
        <button
          type="button"
          onClick={() => {
            setInputValue(profile?.about_me || "");
            setEditing(true);
          }}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-cyan-400 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 px-2.5 py-1 rounded-lg transition-colors"
          title="Edit bio">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <span>Edit</span>
        </button>
      </div>

      {/* Bio paragraph body */}
      <p className="text-slate-300 text-xs md:text-sm leading-relaxed whitespace-pre-line break-words">
        {profile?.about_me || (
          <span className="text-slate-600 italic">No bio added yet.</span>
        )}
      </p>
    </div>
  );
}