import { Reorder } from "motion/react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import CheckboxQuestions from "./CheckboxQuestions";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Icon } from "@iconify/react";

function TemplateQuestion({
  field,
  question_index,
  isReadonly,
  setOldIndex,
  remove,
}) {
  const { setValue } = useFormContext();
  const [active, setActive] = useState("shadow-none");

  const handleQuestionChange = (event, index) => {
    setValue(`questions.${index}.question`, event.target.innerText);
  };

  const handleDelete = () => {
    remove(question_index);
  };
  return (
    <div>
      <Reorder.Item
        as="div"
        key={field.id}
        value={field}
        onDragStart={() => {
          setOldIndex(question_index);
          setActive("shadow-md shadow-blue-500");
        }}
        onDragEnd={() => {
          setActive("shadow-none");
        }}
        dragListener={!isReadonly}
        className={`grid gap-2 p-4 border-2 border-white ${
          !isReadonly ? "hover:border-blue-600" : ""
        } rounded-lg border-current bg-white ${active}`}
      >
        <div>
          <div className="flex font-medium">
            <p className="mr-2 mb-2">{question_index + 1}.</p>
            <label
              className="focus:outline-none cursor-text"
              contentEditable={!isReadonly}
              suppressContentEditableWarning
              onInput={(e) => handleQuestionChange(e, question_index)}
            >
              {field.question}
            </label>
          </div>
          <div className="flex justify-between items-center">
            {field.type === "single_line" && (
              <Input
                type="text"
                disabled
                className="disabled:cursor-auto disabled:opacity-100"
              />
            )}
            {field.type === "multi_line" && (
              <Textarea
                disabled
                rows="3"
                className="disabled:cursor-auto disabled:opacity-100"
              />
            )}
            {field.type === "numeric" && (
              <Input
                type="id"
                disabled
                className="disabled:cursor-auto disabled:opacity-100 lg:w-1/3"
              />
            )}
            {field.type === "checkbox" && (
              <CheckboxQuestions
                question_index={question_index}
                isReadonly={isReadonly}
              />
            )}
            <button
              type="button"
              onClick={handleDelete}
              className="mx-3 text-red-500 hover:text-red-700"
            >
              <Icon icon="lucide:trash" />
            </button>
          </div>
        </div>
      </Reorder.Item>
    </div>
  );
}

export default TemplateQuestion;
