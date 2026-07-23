import type { ProjectData } from "../../../Types/customTypes";
import { useEditingStateLogic } from "../../../CustomHooks/editingStateLogicHook";
import { updateBackendData } from "../../../helperFunctions/upDateBackendData";
import { useMyGlobalState } from "../../../Context/portfolioContext";

export function RepoLink({ project }: { project: ProjectData }) {
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
          field: "repo_link",
          newValue: inputValue,
          projectId: `${projectId}`
        },
        "PUT"
      );

      setProjects(updatedProjects);
    } catch (error) {
      console.error("Failed to update repository link:", error);
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
        <span>Updating repository link...</span>
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
            placeholder="https://github.com/username/repo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            setInputValue(project.repo_link);
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
    <div className="flex items-center gap-2 group/repo text-xs">
      <a
        href={project.repo_link}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 font-medium transition-colors">
        <svg
          className="w-4 h-4 text-slate-400 group-hover/repo:text-cyan-400 transition-colors"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
        <span>Source Code</span>
        <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>

      <button
        type="button"
        onClick={() => {
          setInputValue(project.repo_link);
          setEditing(true);
        }}
        className="p-1 text-slate-500 hover:text-slate-300 hover:bg-slate-800/80 rounded-md transition-colors ml-1"
        title="Edit repo link">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
  );
}