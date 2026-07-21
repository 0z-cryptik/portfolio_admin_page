import { useEditingStateLogic } from "../../../../CustomHooks/editingStateLogicHook";
import { useMyGlobalState } from "../../../../Context/portfolioContext";
import { updateBackendData } from "../../../../helperFunctions/upDateBackendData";
import type { ProfileData } from "../../../../Types/customTypes";

export function Name() {
  const {
    editing,
    loading,
    setLoading,
    setInputValue,
    inputValue,
    setEditing
  } = useEditingStateLogic();

  const { profile, setProfile } = useMyGlobalState();

  async function handleNameSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedProfile = await updateBackendData<ProfileData>(
        "http://localhost:3000/api/profile/1/",
        { field: "full_name", newValue: inputValue },
        "PUT"
      );
      setProfile(updatedProfile);
    } catch (error) {
      console.error("Failed to update name:", error);
    } finally {
      setLoading(false);
      setEditing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-slate-500 animate-pulse py-1">
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="text-sm">Updating name...</span>
      </div>
    );
  }

  if (editing) {
    return (
      <form
        onSubmit={handleNameSubmit}
        className="flex flex-wrap sm:flex-nowrap items-center gap-2 my-1 w-full max-w-full">
        <input
          type="text"
          autoFocus
          className="flex-1 min-w-0 text-lg sm:text-2xl font-extrabold text-white bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="text-xs text-slate-400 hover:text-slate-200 px-3 py-2 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            className="text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 px-3.5 py-2 rounded-lg transition-colors shadow-sm">
            Save
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="group inline-flex items-center gap-2 max-w-full">
      <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white break-words">
        {profile?.full_name}
      </h1>
      <button
        type="button"
        onClick={() => {
          setInputValue(profile?.full_name || "");
          setEditing(true);
        }}
        className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-800/80 rounded-md transition-colors shrink-0"
        title="Edit name">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
  );
}