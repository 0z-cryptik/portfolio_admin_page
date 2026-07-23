import type { ProjectData } from "../../../Types/customTypes";
import { useEditingStateLogic } from "../../../CustomHooks/editingStateLogicHook";
import { updateBackendData } from "../../../helperFunctions/upDateBackendData";
import { useMyGlobalState } from "../../../Context/portfolioContext";

export function BackendRepo({ project }: { project: ProjectData }) {
  const {
    loading,
    setLoading,
    editing,
    setEditing,
    inputValue,
    setInputValue
  } = useEditingStateLogic();

  const { setProjects } = useMyGlobalState();

  async function handleSubmit(projectId: number) {
    setLoading(true);

    try {
      let updatedProjects = await updateBackendData<ProjectData[]>(
        `${import.meta.env.VITE_SERVER_URL}/api/profile/1/projects/`,
        {
          field: "backend_repo",
          newValue: inputValue,
          projectId: `${projectId}`
        },
        "PUT"
      );

      setProjects(updatedProjects);
    } catch (error) {
      console.error("Failed to update backend repository link:", error);
    } finally {
      setLoading(false);
      setEditing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-500 animate-pulse py-1">
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span>Updating backend link...</span>
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
        className="flex items-center gap-2 w-full max-w-md">
        <div className="relative flex-1 min-w-0">
          <input
            type="url"
            required
            autoFocus
            className="w-full text-xs text-slate-200 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-600 transition-all"
            placeholder="https://github.com/username/backend-repo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            setInputValue(project.backend_repo);
            setEditing(false);
          }}
          className="text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors">
          Cancel
        </button>

        <button
          type="submit"
          className="text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 px-3 py-1.5 rounded-lg transition-colors shadow-sm">
          Save
        </button>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-2 group/backend text-xs">
      <a
        href={project.backend_repo}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 font-medium transition-colors">
        {/* Terminal/Server Icon for Backend */}
        <svg
          className="w-4 h-4 text-slate-400 group-hover/backend:text-cyan-400 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
        <span>Backend Code</span>
        <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>

      <button
        type="button"
        onClick={() => {
          setInputValue(project.backend_repo);
          setEditing(true);
        }}
        className="p-1 text-slate-500 hover:text-slate-300 hover:bg-slate-800/80 rounded-md transition-colors ml-1"
        title="Edit backend link">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
  );
}