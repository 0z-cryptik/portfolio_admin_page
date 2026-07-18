import { useState } from "react";
import type { ProjectData } from "../../Types/customTypes";
import { updateBackendData } from "../../helperFunctions/upDateBackendData";
import { useMyGlobalState } from "../../Context/portfolioContext";

export function DeleteProject({ project }: { project: ProjectData }) {
  const [loading, setLoading] = useState(false);
  const { setProjects } = useMyGlobalState();

  async function handleDelete() {
    setLoading(true);

    try {
      const updatedProjects = await updateBackendData<ProjectData[]>(
        "http://localhost:3000/api/profile/1/projects",
        { projectId: `${project.project_id}` },
        "DELETE"
      );

      setProjects(updatedProjects);
    } catch (e) {
      console.error(e);
      alert("Failed to delete project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 ml-6 text-sm cursor-pointer">
      {loading ? "Deleting..." : "Delete Project"}
    </button>
  );
}
