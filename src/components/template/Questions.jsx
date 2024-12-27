import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import CheckboxQuestions from "./CheckboxQuestions";
import { Reorder } from "motion/react";
import { useState } from "react";

function Questions({ field, question_index, setOldIndex }) {
  const { setValue } = useFormContext();
  const [active, setActive] = useState("shadow-none");

  const handleQuestionChange = (event, index) => {
    setValue(`questions.${index}.question`, event.target.innerText);
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
        className={`grid gap-2 p-4 border-2 border-white hover:border-blue-600 rounded-lg border-current bg-white ${active}`}
      >
        <div>
          <div className="flex font-medium">
            <p className="mr-2 mb-2">{question_index + 1}.</p>
            <label
              className="focus:outline-none cursor-text"
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleQuestionChange(e, question_index)}
            >
              {field.question}
            </label>
          </div>
          <div className="flex items-center justify-between">
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
                className="disabled:cursor-auto disabled:opacity-100"
              />
            )}
            {field.type === "checkbox" && (
              <CheckboxQuestions question_index={question_index} />
            )}
            {/* <Icon
                    icon="lucide:grip"
                    className="mx-3 size-6 text-zinc-500 cursor-grab"
                    onPointerDown={(event) => {
                      controls.start(event, { snapToCursor: true });
                    }}
                    style={{ touchAction: "none" }}
                  /> */}
          </div>
        </div>
      </Reorder.Item>
    </div>
  );
}

export default Questions;
