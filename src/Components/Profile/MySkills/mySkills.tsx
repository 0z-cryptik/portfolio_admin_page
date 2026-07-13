import { useState } from "react";
import { useMyGlobalState } from "../../../Context/portfolioContext";
import { AddSkillButton } from "./addSkillButton";
import { MdOutlineCancel } from "react-icons/md";
import { updateBackendData } from "../../../helperFunctions/upDateBackendData";
import type { ProfileData } from "../../../Types/customTypes";

export function MySkills() {
  const { profile, setProfile } = useMyGlobalState();
  const [deletingSkill, setDeletingSkill] = useState(false);

  async function handleDelete(skillId: number) {
    console.log(skillId)
    setDeletingSkill(true);
    const updatedProfile = await updateBackendData<ProfileData>(
      "http://localhost:3000/api/profile/1/skills",
      { skillId: `${skillId}` },
      "DELETE"
    );
    console.log(updatedProfile);
    setProfile(updatedProfile);
    setDeletingSkill(false);
  }

  return (
    <div className="space-y-4 pt-10">
      <h2 className="text-xl font-bold text-slate-200">
        Programming Languages & Frameworks I Use
      </h2>
      <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap gap-2 text-xl">
        {deletingSkill && <p>Loading...</p>}

        {!deletingSkill &&
          profile?.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-md font-mono">
              {skill.skill_name}
              <button
                onClick={() => {
                  handleDelete(skill.skill_id);
                }} className="cursor-pointer ml-2 relative -bottom-1">
                <MdOutlineCancel />
              </button>
            </span>
          ))}

        <AddSkillButton />
      </div>
    </div>
  );
}
