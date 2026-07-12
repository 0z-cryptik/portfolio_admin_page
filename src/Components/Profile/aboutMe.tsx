import { useMyGlobalState } from "../../Context/portfolioContext";
import { EditButton } from "../editButton";
import { updateBackendData } from "../../helperFunctions/upDateBackendData";
import { useEditingStateLogic } from "../../CustomHooks/editingStateLogicHook";
import type { ProfileData } from "../../Types/customTypes";

export function AboutMe() {
  const { profile, setProfile } = useMyGlobalState();
  const {
    loading,
    setLoading,
    editing,
    setEditing,
    inputValue,
    setInputValue
  } = useEditingStateLogic();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setEditing(false);
    let updatedprofile = await updateBackendData<ProfileData>(
      "http://localhost:3000/api/profile/1/",
      { field: "about_me", newValue: inputValue },
      "PUT"
    );

    setProfile(updatedprofile);
    setLoading(false);
  }

  return (
    <div className="md:col-span-2 space-y-4 border-b border-slate-800 pb-6">
      <h2 className="text-xl font-bold text-slate-200">About Me</h2>

      {!editing && !loading && (
        <div className="flex">
          <EditButton
            margin_right
            clickFunction={() => {
              setInputValue(profile.about_me);
              setEditing(true);
            }}
          />
          <p className="text-slate-300 leading-relaxed whitespace-pre-line">
            {profile?.about_me}
          </p>
        </div>
      )}

      {editing && (
        <form onSubmit={handleSubmit}>
          <textarea
            autoFocus
            className="w-[50vw] h-[25vh] p-3 border"
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
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
}
