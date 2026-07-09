import { FaPlus } from "react-icons/fa6";
import { useMyGlobalState } from "../../../Context/portfolioContext";
import React, { useState } from "react";
import { updateBackendData } from "../../../helperFunctions/upDateBackendData";
import {
  MdOutlineCancelPresentation,
  MdOutlineCheckBox
} from "react-icons/md";

export function AddSkillButton() {
  const [editing, setEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [updatingNewSkill, setUpdatingNewSkill] = useState(false);
  const { setProfile } = useMyGlobalState();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setUpdatingNewSkill(true);
    setEditing(false);
    const updatedProfile = await updateBackendData(
      "http://localhost:3000/api/profile/1/skills",
      { newSkill: newSkill },
      "POST"
    );
    setProfile(updatedProfile);
    setUpdatingNewSkill(false);
  }

  if (updatingNewSkill) {
    return <p>Loading...</p>;
  }

  if (!editing && !updatingNewSkill) {
    return (
      <button
        onClick={() => {
          setEditing(true);
        }}
        className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-md font-mono cursor-pointer">
        <FaPlus />
      </button>
    );
  }

  if (editing) {
    return (
      <form
        className="bg-slate-800 border border-slate-700 text-slate-300 rounded-md font-mono"
        onSubmit={handleSubmit}>
        <input
          className="p-1 outline-none"
          type="text"
          autoFocus
          value={newSkill}
          onChange={(e) => {
            setNewSkill(e.target.value);
          }}
        />

        <button
          onClick={() => {
            setEditing(false);
            setNewSkill("");
          }}
          type="button"
          className="cursor-pointer relative -bottom-1">
          <MdOutlineCancelPresentation size={30} />
        </button>
        <button
          type="submit"
          className="cursor-pointer ml-1 relative -bottom-1">
          <MdOutlineCheckBox size={30} />
        </button>
      </form>
    );
  }
}
