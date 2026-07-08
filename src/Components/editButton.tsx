import { CiEdit } from "react-icons/ci";

export function EditButton({
  clickFunction
}: {
  clickFunction: () => void;
}) {
  return (
    <button
      onClick={clickFunction}
      className="ml-3 cursor-pointer">
      <CiEdit />
    </button>
  );
}
