import { useMyGlobalState } from "../../../../../Context/portfolioContext";

export function EditEmailForm({
  handleEmailSubmit,
  myEmail,
  setMyEmail,
  setEditingEmail
}: {
  handleEmailSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  myEmail: string;
  setMyEmail: (value: string) => void;
  setEditingEmail: (value: boolean) => void;
}) {
  const { profile } = useMyGlobalState();

  return (
    <form
      onSubmit={handleEmailSubmit}
      className="flex">
      <input
        type="text"
        autoFocus
        className="border"
        value={myEmail}
        onChange={(e) => {
          setMyEmail(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setMyEmail(profile.email);
          setEditingEmail(false);
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
