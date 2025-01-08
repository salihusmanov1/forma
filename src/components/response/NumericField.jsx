import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { useEffect } from "react";

function NumericField({ isDisabled, index, response, field }) {
  const { setValue } = useFormContext();
  const handleInput = (e) => {
    setValue(`answers.${index}.answer`, e.target.value);
  };
  useEffect(() => {
    setValue(`answers.${index}.answer`, response?.answer || null);
    setValue(`answers.${index}.question_id`, field.id);
    setValue(`answers.${index}.type`, "multi_line");
  }, [index, response, setValue, field]);
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
