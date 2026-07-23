import { useState } from "react";
import { useMyGlobalState } from "../../../Context/portfolioContext";
import { AddSkillButton } from "./addSkillButton";
import { updateBackendData } from "../../../helperFunctions/upDateBackendData";
import type { ProfileData } from "../../../Types/customTypes";

export function MySkills() {
  const { profile, setProfile } = useMyGlobalState();
  const [deletingSkillId, setDeletingSkillId] = useState<number | null>(null);

  async function handleDelete(skillId: number) {
    setDeletingSkillId(skillId);

    try {
      const updatedProfile = await updateBackendData<ProfileData>(
        "http://localhost:3000/api/profile/1/skills",
        { skillId: `${skillId}` },
        "DELETE"
      );
      setProfile(updatedProfile);
    } catch (error) {
      console.error("Failed to delete skill:", error);
      alert("Failed to delete skill")
    } finally {
      setDeletingSkillId(null);
    }
  }

  return (
    <div className="space-y-4 pt-6 md:pt-10">
      <h2 className="text-base md:text-xl font-bold text-slate-200">
        Programming Languages & Frameworks I Use
      </h2>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl flex flex-wrap items-center gap-2">
        {profile.skills.map((skill) => {
          const isDeleting = deletingSkillId === skill.skill_id;

          return (
            <span
              key={skill.skill_id}
              className={`group inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 bg-slate-800/80 border border-slate-700/80 text-slate-300 rounded-lg text-xs md:text-sm font-mono transition-all ${
                isDeleting ? "opacity-50 pointer-events-none" : "hover:border-slate-600"
              }`}>
              <span>{skill.skill_name}</span>

              <button
                type="button"
                disabled={isDeleting}
                onClick={() => handleDelete(skill.skill_id)}
                className="p-1 text-slate-400 group-hover:text-slate-300 hover:text-red-400! hover:bg-red-500/10 rounded-md transition-all focus:outline-none"
                title={`Remove ${skill.skill_name}`}>
                {isDeleting ? (
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </span>
          );
        })}

        <AddSkillButton />
      </div>
    </div>
  );
}