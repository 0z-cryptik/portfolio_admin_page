import type { ProjectData } from "../../Types/customTypes";
import { useMyGlobalState } from "../../Context/portfolioContext";
import { useEditingStateLogic } from "../../CustomHooks/editingStateLogicHook";
import {
  MdOutlineCancelPresentation,
  MdOutlineCheckBox
} from "react-icons/md";
import { updateBackendData } from "../../helperFunctions/upDateBackendData";
import { useState } from "react";

export function ProjectSkills({ project }: { project: ProjectData }) {
  const {
    editing,
    setEditing,
    inputValue,
    setInputValue,
    loading,
    setLoading
  } = useEditingStateLogic();

  const [deleting, setDeleting] = useState(false);

  const { setProjects } = useMyGlobalState();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setEditing(false);
    const updatedProjects = await updateBackendData<ProjectData[]>(
      "http://localhost:3000/api/profile/1/projects/skills",
      { newSkill: inputValue, projectId: `${project.project_id}` },
      "POST"
    );

    setProjects(updatedProjects);
    setInputValue("");
    setLoading(false);
  }

  async function handleDelete(skillId: number) {
    const updatedProjects = await updateBackendData<ProjectData[]>(
      "http://localhost:3000/api/profile/1/projects/skills",
      { skillId: `${skillId}`, projectId: `${project.project_id}` },
      "DELETE"
    );
    setProjects(updatedProjects);
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {project.skills.map((skill, i) => {
        if (!deleting) {
          return (
            <span
              key={i}
              className="px-2 py-0.5 bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 rounded text-[11px] font-mono">
              {skill.skill_name}

              <button
                onClick={() => {
                  handleDelete(skill.skill_id);
                }}
                className="ml-2 border-l border-l-cyan-800/40 pl-1 text-red-700 cursor-pointer">
                X
              </button>
            </span>
          );
        } else {
          return (
            <span
              key={i}
              className="px-2 py-0.5 bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 rounded text-[11px] font-mono">
              Loading
            </span>
          );
        }
      })}

      {loading && (
        <span className="px-2 py-0.5 bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 rounded text-[11px] font-mono">
          Loading...
        </span>
      )}

      {editing && (
        <form
          className="bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 rounded text-[11px] font-mono  flex"
          onSubmit={handleSubmit}>
          <input
            className="px-2 py-0.5 outline-none"
            type="text"
            autoFocus
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />

          <button
            onClick={() => {
              setEditing(false);
              setInputValue("");
            }}
            type="button"
            className="cursor-pointer">
            <MdOutlineCancelPresentation size={20} />
          </button>
          <button
            type="submit"
            className="cursor-pointer ml-1">
            <MdOutlineCheckBox size={20} />
          </button>
        </form>
      )}

      {!editing && !loading && (
        <button
          onClick={() => {
            setEditing(true);
          }}
          className="px-2 py-0.5 bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 rounded text-[11px] font-mono cursor-pointer">
          +
        </button>
      )}
    </div>
  );
}
