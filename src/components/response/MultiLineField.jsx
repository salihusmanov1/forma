import { useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { useEffect } from "react";

function MultiLineField({ isDisabled, index, response, field }) {
  const { setValue } = useFormContext();
  const handleInput = (e) => {
    setValue(`answers.${index}.answer`, e.target.value);
  };
  useEffect(() => {
    setValue(`answers.${index}.answer`, response?.answer || "");
    setValue(`answers.${index}.question_id`, field.id);
    setValue(`answers.${index}.type`, "multi_line");
  }, [index, response, setValue, field]);

  return (
    <div>
      <Textarea
        rows="3"
        disabled={isDisabled}
        onChange={handleInput}
        defaultValue={response?.answer || ""}
        className={
          isDisabled ? "disabled:cursor-auto disabled:opacity-100" : ""
        }
      />
    </div>
  );
}

export default MultiLineField;
