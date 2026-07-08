import { useMyGlobalState } from "../../../../../Context/portfolioContext";
import { EditButton } from "../../../../editButton";

export function DisplayName({
  handleStartEdit
}: {
  handleStartEdit: () => void;
}) {
  const { profile } = useMyGlobalState();

  return (
    <div className="flex">
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1">
        {profile?.full_name}
      </h1>
      <EditButton clickFunction={handleStartEdit} />
    </div>
  );
}
