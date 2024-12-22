import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@iconify/react";
import { Label } from "../ui/label";
import { useFieldArray, useFormContext } from "react-hook-form";

function CheckboxQuestions({ question_index }) {
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
            <Checkbox id="terms2" disabled className="disabled:cursor-auto" />

            <label
              htmlFor="terms2"
              className="text-sm font-medium leading-none focus:outline-none cursor-text"
              contentEditable
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
      <div
        role="button"
        onClick={() => addOption(question_index)}
        tabIndex="0"
        className="flex items-center gap-2 text-zinc-400 mt-2"
      >
        <Icon className="cursor-pointer" icon="lucide:plus"></Icon>
        <Label className="cursor-pointer">Add more options</Label>
      </div>
    </div>
  );
}

export default CheckboxQuestions;
