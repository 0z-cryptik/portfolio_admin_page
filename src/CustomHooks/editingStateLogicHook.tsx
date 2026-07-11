import { useState } from "react";

export function useEditingStateLogic() {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return {
    editing,
    setEditing,
    loading,
    setLoading,
    inputValue,
    setInputValue
  };
}
