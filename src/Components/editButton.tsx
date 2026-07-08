import { CiEdit } from "react-icons/ci";

export function EditButton({
  clickFunction,
  margin_right = false
}: {
  clickFunction: () => void;
  margin_right?: boolean;
}) {
  return (
    <button
      onClick={clickFunction}
      className={`${margin_right ? "mr-3" : "ml-3"} cursor-pointer`}>
      <CiEdit />
    </button>
  );
}
