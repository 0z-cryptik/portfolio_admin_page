import { FaPlus } from "react-icons/fa6";
import { useMyGlobalState } from "../../../Context/portfolioContext";
import { updateBackendData } from "../../../helperFunctions/upDateBackendData";
import { useEditingStateLogic } from "../../../CustomHooks/editingStateLogicHook";
import {
  MdOutlineCancelPresentation,
  MdOutlineCheckBox
} from "react-icons/md";
import type { ProfileData } from "../../../Types/customTypes";

export function AddSkillButton() {
  const {
    setLoading,
    setEditing,
    inputValue,
    setInputValue,
    loading,
    editing
  } = useEditingStateLogic();
  const { setProfile } = useMyGlobalState();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setEditing(false);
    const updatedProfile = await updateBackendData<ProfileData>(
      "http://localhost:3000/api/profile/1/skills",
      { newSkill: inputValue },
      "POST"
    );
    setProfile(updatedProfile);
    setLoading(false);
  }

  if (loading) {
    return <p>Loading...</p>;
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
