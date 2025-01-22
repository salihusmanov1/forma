import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import useSetFormValue from "@/hooks/useSetFormValue";

function CheckboxField({
  index,
  option_index,
  option,
  isDisabled,
  field,
  response,
}) {
  const { setValue } = useFormContext();
  const updateValue = useSetFormValue();
  const [isChecked, setChecked] = useState();

  const handleCheck = (e) => {
    setValue(`answers.${index}.options.${option_index}`, {
      option_id: option.id,
      answer: e,
    });
    setChecked(e);
  };

  useEffect(() => {
    updateValue(
      index,
      { option_id: option.id, answer: response?.answer || false },
      field.id,
      "checkbox",
      option_index
    );
    setChecked(response?.answer || false);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`${index}_${option_index}`}
        onCheckedChange={handleCheck}
        disabled={isDisabled}
        checked={isChecked}
      />
      <label
        htmlFor={`${index}_${option_index}`}
        className="text-sm font-medium leading-none focus:outline-none"
      >
        {option.name}
      </label>
    </div>
  );
}

export default CheckboxField;
