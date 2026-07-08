import { useMyGlobalState } from "../../../../../Context/portfolioContext";
import { EditButton } from "../../../../editButton";

export function DisplayEmail({
  handleStartEmailEdit,
  editingName
}: {
  handleStartEmailEdit: () => void;
  editingName: boolean;
}) {
  const { profile } = useMyGlobalState();

  return (
    <div className="flex">
      <p className={`${editingName && "mt-4"} text-cyan-400 font-medium`}>
        {profile?.email}
      </p>
      <EditButton clickFunction={handleStartEmailEdit} />
    </div>
  );
}
