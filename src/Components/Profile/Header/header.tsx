import { useMyGlobalState } from "../../../Context/portfolioContext";
import { useState } from "react";
import { updateBackendData } from "../../../helperFunctions/editSubmitionFuncs";
import { DisplayName } from "./Name/Display/nameDisplay";
import { DisplayEmail } from "./Email/Display/emailDisplay";
import { EditNameForm } from "./Name/Editing/nameEditForm";
import { EditEmailForm } from "./Email/Editing/emailEditForm";

export function Header() {
  const { profile, setProfile } = useMyGlobalState();

  // Editing name state
  const [editingName, setEditingName] = useState(false);
  const [myName, setMyName] = useState("");
  const [updatingNewName, setUpdatingNewName] = useState(false);

  // Editing email state
  const [editingEmail, setEditingEmail] = useState(false);
  const [myEmail, setMyEmail] = useState("");
  const [updatingNewEmail, setUpdatingNewEmail] = useState(false);

  function handleStartNameEdit() {
    setMyName(profile.full_name || "");
    setEditingName(true);
  }

  function handleStartEmailEdit() {
    setMyEmail(profile.email || "");
    setEditingEmail(true);
  }

  async function handleNameSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setUpdatingNewName(true);
    setEditingName(false);
    let updatedProfile = await updateBackendData(
      "http://localhost:3000/api/profile/1/",
      { field: "full_name", newValue: myName }
    );

    setProfile(updatedProfile);
    setUpdatingNewName(false);
  }

  async function handleEmailSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setUpdatingNewEmail(true);
    setEditingEmail(false);
    let updatedprofile = await updateBackendData(
      "http://localhost:3000/api/profile/1/",
      { field: "email", newValue: myEmail }
    );

    setProfile(updatedprofile);
    setUpdatingNewEmail(false);
  }

  return (
    <header className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        {updatingNewName && <p>Loading...</p>}
        {editingName && (
          <EditNameForm
            handleNameSubmit={handleNameSubmit}
            setEditingName={setEditingName}
            setMyName={setMyName}
            myName={myName}
          />
        )}
        {!editingName && !updatingNewName && (
          <DisplayName handleStartEdit={handleStartNameEdit} />
        )}

        {updatingNewEmail && <p>Loading...</p>}
        {editingEmail && (
          <EditEmailForm
            myEmail={myEmail}
            handleEmailSubmit={handleEmailSubmit}
            setEditingEmail={setEditingEmail}
            setMyEmail={setMyEmail}
          />
        )}
        {!editingEmail && !updatingNewEmail && (
          <DisplayEmail
            editingName={editingName}
            handleStartEmailEdit={handleStartEmailEdit}
          />
        )}
      </div>
    </header>
  );
}
