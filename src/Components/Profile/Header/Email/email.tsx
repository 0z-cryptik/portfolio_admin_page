import { useMyGlobalState } from "../../../../Context/portfolioContext";
import { useEditingStateLogic } from "../../../../CustomHooks/editingStateLogicHook";
import { updateBackendData } from "../../../../helperFunctions/upDateBackendData";
import type { ProfileData } from "../../../../Types/customTypes";
import { EditButton } from "../../../editButton";

export function Email() {
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
      { field: "email", newValue: inputValue },
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
        className="flex">
        <input
          type="text"
          autoFocus
          className="border p-2"
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
      <p className={`text-cyan-400 font-medium`}>{profile?.email}</p>
      <EditButton
        clickFunction={() => {
          setInputValue(profile.email);
          setEditing(true);
        }}
      />
    </div>
  );
}
