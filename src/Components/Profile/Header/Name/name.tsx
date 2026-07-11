import { useEditingStateLogic } from "../../../../CustomHooks/editingStateLogicHook";
import { useMyGlobalState } from "../../../../Context/portfolioContext";
import { updateBackendData } from "../../../../helperFunctions/upDateBackendData";
import { EditButton } from "../../../editButton";

export function Name() {
  const {
    editing,
    loading,
    setLoading,
    setInputValue,
    inputValue,
    setEditing
  } = useEditingStateLogic();

  const { profile, setProfile } = useMyGlobalState();

  async function handleNameSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setEditing(false);
    let updatedProfile = await updateBackendData(
      "http://localhost:3000/api/profile/1/",
      { field: "full_name", newValue: inputValue },
      "PUT"
    );

    setProfile(updatedProfile);
    setLoading(false);
  }

  if (editing) {
    return (
      <form
        onSubmit={handleNameSubmit}
        className="flex">
        <input
          className="text-4xl font-extrabold border max-w-[25vw] p-2"
          autoFocus
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          type="button"
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1">
        {profile?.full_name}
      </h1>
      <EditButton
        clickFunction={() => {
          setInputValue(profile.full_name);
          setEditing(true);
        }}
      />
    </div>
  );
}
