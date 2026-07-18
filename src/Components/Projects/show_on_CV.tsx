import { useState } from "react";
import { useMyGlobalState } from "../../Context/portfolioContext";
import { updateBackendData } from "../../helperFunctions/upDateBackendData";
import type { ProjectData } from "../../Types/customTypes";

interface ProjectRepoToggleProps {
  project: ProjectData;
}

export function ShowOnCVToggle({ project }: ProjectRepoToggleProps) {
  const { setProjects } = useMyGlobalState();
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleToggle() {
    setIsUpdating(true);

    const newValue = !project.show_on_cv;

    try {
      const updatedProjects = await updateBackendData<any>(
        "http://localhost:3000/api/profile/1/projects/",
        {
          field: "show_on_cv",
          newValue: newValue,
          projectId: `${project.project_id}`
        },
        "PUT"
      );

      setProjects(updatedProjects);
    } catch (err) {
      console.error("Failed to toggle repository status:", err);
      alert("Could not update project settings. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none group">
      {/* Hidden native checkbox to handle input mechanics */}
      <input
        type="checkbox"
        checked={project.show_on_cv ? true : false}
        onChange={handleToggle}
        disabled={isUpdating}
        className="sr-only peer"
      />

      {/* Styled toggle switch layout */}
      <div className="relative w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500 group-hover:ring-2 group-hover:ring-slate-600 rounded-full transition-all duration-150 disabled:opacity-50"></div>

      <span className="text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors">
        {isUpdating ? "Saving..." : "Show on CV"}
      </span>
    </label>
  );
}
