import { useState } from "react";
import { updateBackendData } from "../../../helperFunctions/upDateBackendData";
import type { ProjectData } from "../../../Types/customTypes";
import { ImBin2 } from "react-icons/im";
import { useMyGlobalState } from "../../../Context/portfolioContext";

export function AddProjectForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [addProject, setAddProject] = useState(false);

  const [formInputData, setFormInputData] = useState({
    projectName: "",
    description: "",
    liveLink: "",
    backendRepoLink: "",
    repoLink: "",
    seeHowItWorks: "",
    skillIds: [] as number[],
    showOnCV: true
  });

  const { profile, setProjects } = useMyGlobalState();

  function resetInputState() {
    setFormInputData({
      projectName: "",
      description: "",
      liveLink: "",
      backendRepoLink: "",
      repoLink: "",
      seeHowItWorks: "",
      skillIds: [],
      showOnCV: true
    });
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updatedProjects = await updateBackendData<ProjectData[]>(
        `${import.meta.env.VITE_SERVER_URL}/api/profile/1/projects`,
        formInputData,
        "POST"
      );

      setProjects(updatedProjects);
      setAddProject(false);
      resetInputState();
    } catch (e: any) {
      console.error(e);
      alert("Error adding new project");
    } finally {
      setIsLoading(false);
    }
  }

  function handleToggleSkill(skillId: number) {
    setFormInputData((prev) => {
      const alreadySelected = prev.skillIds.includes(skillId);

      const updatedSkillIds = alreadySelected
        ? prev.skillIds.filter((name) => name !== skillId) // Remove if clicked again
        : [...prev.skillIds, skillId]; // Add if not present

      return { ...prev, skillIds: updatedSkillIds };
    });
  }

  function handleToggleCv() {
    setFormInputData((prev) => ({
      ...prev,
      showOnCV: !prev.showOnCV
    }));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormInputData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  if (!addProject) {
    return (
      <button
        className="w-full max-sm:text-sm py-1 md:py-3 border rounded-md cursor-pointer text-slate-100 hover:text-cyan-400"
        onClick={() => {
          setAddProject(true);
        }}>
        Add Project +
      </button>
    );
  } else {
    return (
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full bg-slate-900 p-6 rounded-lg border border-slate-800">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Project Name
          </label>
          <input
            type="text"
            name="projectName" // Must match the state key exactly!
            value={formInputData.projectName}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-100 max-sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Description
          </label>
          <textarea
            name="description" // Must match the state key exactly!
            value={formInputData.description}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-100 h-24 resize-none max-sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Live link
          </label>
          <input
            type="url"
            name="liveLink" // Must match the state key exactly!
            value={formInputData.liveLink}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-100 max-sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            See how it works
          </label>
          <input
            type="url"
            name="seeHowItWorks" // Must match the state key exactly!
            value={formInputData.seeHowItWorks}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-100 max-sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Repo Link
          </label>
          <input
            type="url"
            name="repoLink" // Must match the state key exactly!
            value={formInputData.repoLink}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-100 max-sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Backend Repo
          </label>
          <input
            type="url"
            name="backendRepoLink" // Must match the state key exactly!
            value={formInputData.backendRepoLink}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-100 max-sm:text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Programming Languages/frameworks used
          </label>

          <div className="flex max-sm:text-xs flex-wrap gap-2 bg-slate-900 p-3 rounded border border-slate-800">
            {profile.skills.map((skill) => {
              const isSelected = formInputData.skillIds.includes(
                skill.skill_id
              );
              return (
                <button
                  type="button"
                  key={skill.skill_id}
                  onClick={() => {
                    handleToggleSkill(skill.skill_id);
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-full border transition-all ${
                    isSelected
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}>
                  {skill.skill_name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="py-2">
          <label className="inline-flex items-center gap-3 cursor-pointer select-none group">
            <input
              type="checkbox"
              name="showOnCV"
              checked={formInputData.showOnCV}
              onChange={handleToggleCv}
              className="sr-only peer"
            />
            <div className="relative w-9 h-5 bg-slate-700 peer-focus:outline-none peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500 group-hover:ring-2 group-hover:ring-slate-600 rounded-full transition-all duration-150"></div>
            <span className="md:text-sm text-xs font-medium text-slate-300 group-hover:text-slate-100 transition-colors">
              Show on CV
            </span>
          </label>
        </div>

        <div className="flex max-sm:gap-3 md:flex-col md:gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 transition-colors text-white font-medium py-2 rounded disabled:opacity-50 cursor-pointer max-sm:text-sm">
            {isLoading ? "Saving..." : "Save Project"}
          </button>
          <button
            type="button"
            className="w-full bg-cyan-700 hover:bg-cyan-500 transition-colors text-white font-medium py-2 rounded disabled:opacity-50 hover:text-red-500 cursor-pointer max-sm:text-sm"
            onClick={() => {
              setAddProject(false);
              resetInputState();
            }}
            disabled={isLoading}>
            Cancel
            <ImBin2 className="inline ml-2 mb-1" />
          </button>
        </div>
      </form>
    );
  }
}
