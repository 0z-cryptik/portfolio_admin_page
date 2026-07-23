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

    try {
      const updatedProjects = await updateBackendData<ProjectData[]>(
        "http://localhost:3000/api/profile/1/projects/skills",
        { newSkill: inputValue, projectId: `${project.project_id}` },
        "POST"
      );

      setProjects(updatedProjects);
    } catch (e) {
      alert("Error submitting new skill");
      console.error(e);
    } finally {
      setInputValue("");
      setLoading(false);
    }
  }

  async function handleDelete(skillId: number) {
    setDeleting(true);

    try {
      const updatedProjects = await updateBackendData<ProjectData[]>(
        `${import.meta.env.VITE_SERVER_URL}/api/profile/1/projects/skills`,
        { skillId: `${skillId}`, projectId: `${project.project_id}` },
        "DELETE"
      );
      setProjects(updatedProjects);
    } catch (e) {
      alert("Failed to delete skill");
      console.error(e);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-6 pt-3 md:pt-4 border-t border-slate-800/60">
      {project.skills.map((skill, i) => {
        if (!deleting) {
          return (
            <span
              key={i}
              className="px-2 py-0.5 bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 rounded text-[8.5px] md:text-[11px] font-mono">
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
          className="bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 rounded md:text-[11px] text-[8.5px] font-mono  flex"
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
          className="px-2 py-0.5 bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 rounded text-[8.5px] md:text-[11px] font-mono cursor-pointer">
          +
        </button>
      )}
    </div>
  );
}
