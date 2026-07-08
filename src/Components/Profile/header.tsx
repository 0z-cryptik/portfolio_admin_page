import { useMyGlobalState } from "../../Context/portfolioContext";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { updateBackendData } from "../../helperFunctions/editSubmitionFuncs";

export function Header() {
  const { profile, setProfile } = useMyGlobalState();
  const [editingName, setEditingName] = useState(false);
  const [myName, setMyName] = useState("");
  const [updatingNewName, setUpdatingNewName] = useState(false);

  function handleStartEdit() {
    setMyName(profile.full_name || "");
    setEditingName(true);
  }

  async function handleSubmit() {
    setUpdatingNewName(true);
    setEditingName(false);
    const updatedProfile = await updateBackendData(
      "http://localhost:3000/api/profile/1",
      { newValue: myName }
    );

    setProfile(updatedProfile);
    setUpdatingNewName(false);
  }

  return (
    <header className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        {updatingNewName && <p>Loading...</p>}
        {editingName && (
          <div className="flex">
            <input
              className="text-4xl font-extrabold border max-w-[25vw] p-2"
              autoFocus
              type="text"
              value={myName}
              onChange={(e) => {
                setMyName(e.target.value);
              }}
            />
            <button
              onClick={() => {
                setMyName(profile.full_name);
                setEditingName(false);
              }}
              className="bg-slate-800 rounded-md p-2 ml-4 cursor-pointer">
              cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-slate-800 rounded-md p-2 ml-4 cursor-pointer">
              submit
            </button>
          </div>
        )}
        {!editingName && !updatingNewName && (
          <div className="flex">
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1">
              {profile?.full_name}
            </h1>
            <button
              onClick={handleStartEdit}
              className="ml-3 cursor-pointer">
              <CiEdit />
            </button>
          </div>
        )}

        <p
          className={`${editingName && "mt-4"} text-cyan-400 font-medium`}>
          {profile?.email}
        </p>
      </div>
    </header>
  );
}
