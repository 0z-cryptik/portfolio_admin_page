import { useMyGlobalState } from "../../../../../Context/portfolioContext";

export function EditNameForm({
  handleNameSubmit,
  myName,
  setMyName,
  setEditingName
}: {
  handleNameSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  myName: string;
  setMyName: (value: string) => void;
  setEditingName: (value: boolean) => void;
}) {
  const { profile } = useMyGlobalState();

  return (
    <form
      onSubmit={handleNameSubmit}
      className="flex">
      <input
        className="text-4xl font-extrabold border max-w-[25vw] p-2"
        autoFocus
        type="text"
        value={myName}
        onChange={(e) => {
          setMyName(e.target.value);
        }}
      />
      <button type="button"
        onClick={() => {
          setMyName(profile.full_name);
          setEditingName(false);
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
