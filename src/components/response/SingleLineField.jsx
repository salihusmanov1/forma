import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { useEffect } from "react";
import useSetFormValue from "@/hooks/useSetFormValue";

function SingleLineField({ isDisabled, index, response, field }) {
  const { setValue } = useFormContext();
  const updateValue = useSetFormValue();

  const handleInput = (e) => {
    setValue(`answers.${index}.answer`, e.target.value);
  };
  useEffect(() => {
    updateValue(index, response?.answer || "", field.id, "single_line");
  }, []);

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
