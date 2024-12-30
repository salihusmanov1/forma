import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@iconify/react";
import { Label } from "../ui/label";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";

function CheckboxQuestions({ question_index, isReadonly }) {
  const { setValue, control } = useFormContext();

  const options = useFieldArray({
    control,
    name: `questions.${question_index}.options`,
  });

  const handleOptionChange = (event, question_index, option_index) => {
    setValue(
      `questions.${question_index}.options.${option_index}.name`,
      event.target.innerText
    );
  };

  const addOption = () => {
    options.append({ name: `Option ${options.fields.length + 1}` });
  };
  return (
    <div>
      {options.fields.map((option, option_index) => (
        <div key={option_index} className="grid gap-4 p-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${question_index}_${option_index}`}
              disabled
              className="disabled:cursor-auto"
            />

            <label
              htmlFor={`${question_index}_${option_index}`}
              className="text-sm font-medium leading-none focus:outline-none cursor-text"
              contentEditable={!isReadonly}
              suppressContentEditableWarning
              onInput={(e) =>
                handleOptionChange(e, question_index, option_index)
              }
            >
              {option.name}
            </label>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        disabled={isReadonly}
        onClick={() => addOption(question_index)}
        className=" flex items-center gap-2 text-zinc-400 mt-2"
      >
        <Icon icon="lucide:plus"></Icon>
        <Label>Add more options</Label>
      </Button>
    </div>
  );
}

export default CheckboxQuestions;
