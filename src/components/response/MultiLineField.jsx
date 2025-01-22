import { useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { useEffect } from "react";
import useSetFormValue from "@/hooks/useSetFormValue";

function MultiLineField({ isDisabled, index, response, field }) {
  const { setValue } = useFormContext();
  const updateValue = useSetFormValue();
  const handleInput = (e) => {
    setValue(`answers.${index}.answer`, e.target.value);
  };
  useEffect(() => {
    updateValue(index, response?.answer || "", field.id, "multi_line");
  }, []);

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
