import { useState } from "react";
import { useMyGlobalState } from "../../Context/portfolioContext";
import { EditButton } from "../editButton";
import { updateBackendData } from "../../helperFunctions/editSubmitionFuncs";

export function AboutMe() {
  const { profile, setProfile } = useMyGlobalState();
  const [editing, setEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState("");
  const [updating, setUpdating] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setUpdating(true);
    setEditing(false);
    let updatedprofile = await updateBackendData(
      "http://localhost:3000/api/profile/1/",
      { field: "about_me", newValue: aboutMe }
    );

    setProfile(updatedprofile);
    setUpdating(false);
  }

  return (
    <div className="md:col-span-2 space-y-4 border-b border-slate-800 pb-6">
      <h2 className="text-xl font-bold text-slate-200">About Me</h2>

      {!editing && !updating && (
        <div className="flex">
          <EditButton margin_right
            clickFunction={() => {
              setEditing(true);
              setAboutMe(profile.about_me);
            }}
          />
          <p className="text-slate-300 leading-relaxed whitespace-pre-line">
            {profile?.about_me}
          </p>
        </div>
      )}

      {editing && (
        <form onSubmit={handleSubmit}>
          <textarea autoFocus className="w-[50vw] h-[25vh] p-3 border"
            value={aboutMe}
            onChange={(e) => {
              setAboutMe(e.target.value);
            }}
          />

          <button type="button"
            onClick={() => {
              setAboutMe(profile.about_me);
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

      {updating && <p>Loading...</p>}
    </div>
  );
}
