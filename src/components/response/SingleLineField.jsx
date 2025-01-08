import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { useEffect } from "react";

function SingleLineField({ isDisabled, index, response, field }) {
  const { setValue } = useFormContext();

  const handleInput = (e) => {
    setValue(`answers.${index}.answer`, e.target.value);
  };
  useEffect(() => {
    setValue(`answers.${index}.answer`, response?.answer || "");
    setValue(`answers.${index}.question_id`, field.id);
    setValue(`answers.${index}.type`, "single_line");
  }, [index, response, setValue, field]);

  return (
    <div>
      <Input
        type="text"
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

export default SingleLineField;
