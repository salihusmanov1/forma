import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { useEffect } from "react";
import useSetFormValue from "@/hooks/useSetFormValue";

function NumericField({ isDisabled, index, response, field }) {
  const { setValue } = useFormContext();
  const updateValue = useSetFormValue();
  const handleInput = (e) => {
    setValue(`answers.${index}.answer`, e.target.value);
  };
  useEffect(() => {
    updateValue(index, response?.answer || "", field.id, "numeric");
  }, []);
  return (
    <div>
      <Input
        type="number"
        min="0"
        className={`lg:w-1/3 ${
          isDisabled ? "disabled:cursor-auto disabled:opacity-100" : ""
        }`}
        onChange={handleInput}
        defaultValue={response?.answer || ""}
        disabled={isDisabled}
      />
    </div>
  );
}

export default NumericField;
