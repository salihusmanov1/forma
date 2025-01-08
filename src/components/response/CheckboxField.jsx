import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

function CheckboxField({
  index,
  option_index,
  option,
  isDisabled,
  field,
  answers,
}) {
  const { setValue, watch } = useFormContext();

  const handleCheck = (e) => {
    setValue(`answers.${index + option_index}.answer`, e);
  };

  useEffect(() => {
    setValue(`answers.${index + option_index}.question_id`, field.id);
    setValue(`answers.${index + option_index}.option_id`, option.id);
    setValue(`answers.${index + option_index}.type`, field.type);

    const existingAnswer = answers?.find((a) => a.option_id === option.id);
    setValue(
      `answers.${index + option_index}.answer`,
      existingAnswer?.answer || false
    );
  }, []);

  const isChecked = watch(`answers.${index + option_index}.answer`);

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
