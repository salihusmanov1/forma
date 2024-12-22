import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import CheckboxQuestions from "./CheckboxQuestions";

function LineQuestions({ questions }) {
  const { setValue } = useFormContext();

  const handleQuestionChange = (event, index) => {
    setValue(`questions.${index}.question`, event.target.innerText);
  };

  return (
    <div>
      <div className="grid w-full items-center gap-1.5">
        {questions.fields.map((field, question_index) => (
          <div
            key={question_index}
            className="grid gap-2 p-2 border-2 border-white hover:border-blue-600 rounded-lg border-current"
          >
            <div className="flex font-medium">
              <p className="mr-2">{field.number}.</p>
              <label
                className="focus:outline-none cursor-text"
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => handleQuestionChange(e, field.number - 1)}
              >
                {field.question}
              </label>
            </div>
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
                type="number"
                disabled
                className="disabled:cursor-auto disabled:opacity-100"
              />
            )}
            {field.type === "checkbox" && (
              <CheckboxQuestions question_index={question_index} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LineQuestions;
