import { useEditingStateLogic } from "../../CustomHooks/editingStateLogicHook";
import type { ProjectData } from "../../Types/customTypes";
import { updateBackendData } from "../../helperFunctions/upDateBackendData";
import { useMyGlobalState } from "../../Context/portfolioContext";

export function ProjectDescription({ project }: { project: ProjectData }) {
  const {
    setInputValue,
    setEditing,
    loading,
    setLoading,
    inputValue,
    editing
  } = useEditingStateLogic();

  const { setProjects } = useMyGlobalState();

  async function handleSubmit(projectId: number) {
    setLoading(true);

    try {
      let updatedProjects = await updateBackendData<ProjectData[]>(
        "http://localhost:3000/api/profile/1/projects/",
        {
          field: "description",
          newValue: inputValue,
          projectId: `${projectId}`
        },
        "PUT"
      );

      setProjects(updatedProjects);
    } catch (error) {
      console.error("Failed to update project description:", error);
    } finally {
      setLoading(false);
      setEditing(false);
    }
  }

  if (loading) {
    return (
      <div className="w-full text-xs text-slate-500 animate-pulse py-2 mt-4 md:mt-5 flex items-center gap-2">
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span>Updating description...</span>
      </div>
    );
  }

  if (editing) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(project.project_id);
        }}
        className="w-full min-w-0 flex flex-col gap-2.5 mt-4 md:mt-5">
        <textarea
          className="w-full text-xs md:text-sm text-slate-200 bg-slate-900 border border-slate-700 rounded-lg p-3 min-h-27.5 resize-y leading-relaxed focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder-slate-600"
          autoFocus
          placeholder="Enter project description..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              setInputValue(project.description);
              setEditing(false);
            }}
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
    );
  }

  return (
    <div className="relative w-full min-w-0 mt-4 md:mt-5 p-3 rounded-lg border border-slate-800/80 bg-slate-900/40">
      {/* Header bar with section context & persistent edit button */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/60">
        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
          Description
        </span>
        <button
          type="button"
          onClick={() => {
            setInputValue(project.description);
            setEditing(true);
          }}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-cyan-400 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 px-2 py-0.5 rounded transition-colors"
          title="Edit description">
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

      <p className="w-full text-slate-300 text-xs md:text-sm leading-relaxed wrap-break-words">
        {project.description || (
          <span className="text-slate-600 italic">No description provided.</span>
        )}
      </p>
    </div>
  );
}