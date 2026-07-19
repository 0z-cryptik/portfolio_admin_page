import { useMyGlobalState } from "../../../../Context/portfolioContext";
import { useEditingStateLogic } from "../../../../CustomHooks/editingStateLogicHook";
import { updateBackendData } from "../../../../helperFunctions/upDateBackendData";
import type { ProfileData } from "../../../../Types/customTypes";
import { EditButton } from "../../../editButton";

export function LinkedIn() {
  const {
    editing,
    loading,
    setLoading,
    setInputValue,
    inputValue,
    setEditing
  } = useEditingStateLogic();

  const { profile, setProfile } = useMyGlobalState();

  async function handleEmailSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setEditing(false);

    let updatedprofile = await updateBackendData<ProfileData>(
      "http://localhost:3000/api/profile/1/",
      { field: "linkedin_url", newValue: inputValue },
      "PUT"
    );

    setProfile(updatedprofile);
    setLoading(false);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (editing) {
    return (
      <form
        onSubmit={handleEmailSubmit}
        className="flex items-center">
            <label className="mr-3">LinkedIn: </label>
        <input
          type="text"
          autoFocus
          className="border p-2 text-xs min-w-140"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
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
      <p className="flex max-w-140 gap-2 items-center">
        LinkedIn: <a href={profile.linkedin_url} className=" text-cyan-400 text-xs truncate inline">{profile.linkedin_url}</a>
      </p>
      <EditButton
        clickFunction={() => {
          setInputValue(profile.linkedin_url);
          setEditing(true);
        }}
      />
    </div>
  );
}
