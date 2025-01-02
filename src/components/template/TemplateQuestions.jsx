import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Reorder, AnimatePresence } from "motion/react";
import TemplateQuestion from "./TemplateQuestion";

function TemplateQuestions({
  id,
  onSubmit,
  createNewForm,
  formLoading,
  templateLoading,
}) {
  const [isReadonly, setReadonly] = useState(true);
  const [oldIndex, setOldIndex] = useState();
  const {
    setValue,
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const questions = useFieldArray({
    name: "questions",
    control,
  });

  const values = getValues();

  useEffect(() => {
    if (!id) {
      setReadonly(false);
    }
  }, [id, setValue]);

  const handleTitleChange = (event) => {
    setValue("template_name", event.target.innerText);
  };
  const handleDescriptionChange = (event) => {
    setValue("template_description", event.target.innerText);
  };

  const getLength = (type) =>
    questions.fields.filter((item) => item.type === type).length;

  const addSingleLineField = () => {
    questions.append({
      question: "Question",
      type: "single_line",
    });
  };

  const addMultiLineField = () => {
    questions.append({
      question: "Question",
      type: "multi_line",
    });
  };

  const addNumericField = () => {
    questions.append({
      question: "Question",
      type: "numeric",
    });
  };
  const addCheckboxField = () => {
    questions.append({
      question: "Question",
      type: "checkbox",
      options: [{ name: "Option 1" }],
    });
  };

  const moveElement = (newArray) => {
    newArray.forEach((item, index) => {
      const currentElement = questions.fields[oldIndex];
      if (currentElement == item) {
        questions.move(oldIndex, index);
        setOldIndex(index);
      }
    });
  };

  return (
    <div className="w-full sm:w-2/3 mx-auto h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-5">
          <CardHeader className="grid gap-4 break-all">
            <label
              className="focus:outline-none cursor-text pb-10 text-4xl font-bold tracking-tight lg:text-5xl"
              contentEditable={!isReadonly}
              suppressContentEditableWarning
              onInput={(e) => handleTitleChange(e)}
            >
              {values.template_name}
            </label>

            <label
              className="focus:outline-none cursor-text pb-10  leading-7 text-xl"
              contentEditable={!isReadonly}
              suppressContentEditableWarning
              onInput={(e) => handleDescriptionChange(e)}
            >
              {values.template_description}
            </label>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm/6 font-medium text-gray-900"
              ></label>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Reorder.Group
              axis="y"
              as="div"
              values={questions.fields}
              onReorder={moveElement}
            >
              <AnimatePresence>
                {questions.fields.map((field, index) => (
                  <div key={field.id}>
                    <TemplateQuestion
                      field={field}
                      question_index={index}
                      isReadonly={isReadonly}
                      setOldIndex={setOldIndex}
                      remove={questions.remove}
                    />
                  </div>
                ))}
              </AnimatePresence>
            </Reorder.Group>

            <div className="text-center">
              {!isReadonly && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-zinc-400 rounded-full hover:bg-zinc-500 p-3 text-white">
                    <Icon icon="lucide:plus"></Icon>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={addSingleLineField}
                      disabled={getLength("single_line") == 4}
                    >
                      Single Line
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={addMultiLineField}
                      disabled={getLength("multi_line") == 4}
                    >
                      Multi Line
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={addNumericField}
                      disabled={getLength("numeric") == 4}
                    >
                      Numeric
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={addCheckboxField}
                      disabled={getLength("checkbox") == 4}
                    >
                      Checkbox
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {id ? (
              <Button
                type="button"
                disabled={formLoading}
                onClick={createNewForm}
              >
                {formLoading && (
                  <Icon icon="lucide:loader-circle" className="animate-spin" />
                )}
                Use Template
              </Button>
            ) : (
              <Button type="submit" disabled={templateLoading}>
                {templateLoading && (
                  <Icon icon="lucide:loader-circle" className="animate-spin" />
                )}
                Create and Use Template
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default TemplateQuestions;
