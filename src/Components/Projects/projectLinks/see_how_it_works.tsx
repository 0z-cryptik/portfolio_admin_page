import type { ProjectData } from "../../../Types/customTypes";
import { useEditingStateLogic } from "../../../CustomHooks/editingStateLogicHook";
import { updateBackendData } from "../../../helperFunctions/upDateBackendData";
import { useMyGlobalState } from "../../../Context/portfolioContext";

export function SeeHowItWorks({ project }: { project: ProjectData }) {
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
    setEditing(false);

    let updatedProjects = await updateBackendData<ProjectData[]>(
      "http://localhost:3000/api/profile/1/projects/",
      {
        field: "see_how_it_works",
        newValue: inputValue,
        projectId: `${projectId}`
      },
      "PUT"
    );

    setProjects(updatedProjects);
    setLoading(false);
  }

  return (
    <div className="flex">
      <a
        href={project.see_how_it_works}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center text-xs text-blue-600 underline">
        See how it works↗
      </a>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(project.project_id);
        }}>
        {loading && (
          <input
            className="text-xs border ml-2 p-2 cursor-text w-60 truncate"
            value="Loading..."
            readOnly
          />
        )}

        {!loading && (
          <input
            className="text-xs border ml-2 p-1 cursor-text w-60 truncate"
            placeholder={project.see_how_it_works}
            readOnly={!editing}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onClick={() => {
              setInputValue(project.see_how_it_works);
              setEditing(true);
            }}
          />
        )}

        {editing && !loading && (
          <span>
            <button
              onClick={() => {
                setInputValue(project.see_how_it_works);
                setEditing(false);
              }}
              type="button"
              className="bg-slate-800 rounded-md p-1 ml-2 cursor-pointer text-xs">
              cancel
            </button>
            <button
              type="submit"
              className="bg-slate-800 rounded-md p-1 ml-2 cursor-pointer text-xs">
              submit
            </button>
          </span>
        )}
      </form>
    </div>
  );
}
