import { useEditingStateLogic } from "../../CustomHooks/editingStateLogicHook";
import type { ProjectData } from "../../Types/customTypes";
import { EditButton } from "../editButton";
import { updateBackendData } from "../../helperFunctions/upDateBackendData";
import { useMyGlobalState } from "../../Context/portfolioContext";

export function ProjectTitle({ project }: { project: ProjectData }) {
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
    setEditing(false);

    let updatedProjects = await updateBackendData<ProjectData[]>(
      "http://localhost:3000/api/profile/1/projects/",
      { field: "title", newValue: inputValue, projectId: `${projectId}` },
      "PUT"
    );

    setProjects(updatedProjects);
    setLoading(false);
  }

  if (loading) {
    return <p>Loading</p>;
  }

  if (editing) {
    return (
      <form
        onSubmit={() => {
          handleSubmit(project.project_id);
        }}
        className="flex">
        <input
          className="text-lg font-bold text-slate-100 border p-1"
          autoFocus
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          type="button"
          onClick={() => {
            setEditing(false);
          }}
          className="bg-slate-800 rounded-md p-2 ml-4 cursor-pointer">
          cancel
        </button>
        <button
          type="submit"
          className="bg-slate-800 rounded-md p-2 ml-4 cursor-pointer">
          submit
        </button>
      </form>
    );
  }

  return (
    <div className="flex">
      <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
        {project.title}
      </h3>
      <EditButton
        clickFunction={() => {
          setInputValue(project.title);
          setEditing(true);
        }}
      />
    </div>
  );
}
