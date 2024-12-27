import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useState } from "react";
import {
  useCreateTemplateMutation,
  useGetTemplateQuery,
} from "@/state/slices/templates/templatesApiSlice";
import { useSelector } from "react-redux";
import Questions from "@/components/template/Questions";
import { Reorder, AnimatePresence } from "motion/react";
import { useParams } from "react-router";
import { useEffect } from "react";

export default function Template() {
  let { id } = useParams();
  const skip = !id;
  const { user } = useSelector((state) => state.auth);
  const { data: template } = useGetTemplateQuery(id, { skip });

  const methods = useForm({
    defaultValues: {
      questions: [{ question: " Question", type: "single_line" }],
      template_name: "Template Title",
      template_description: "Template Description",
    },
  });
  const {
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    reset,
  } = methods;

  useEffect(() => {
    reset(template?.data);
    setImgUrl(template?.data.image_url);
  }, [reset, template?.data]);

  const values = getValues();

  const questions = useFieldArray({
    name: "questions",
    control,
  });

  const [imageUrl, setImgUrl] = useState(null);
  const [createTemplate, { isLoading }] = useCreateTemplateMutation();
  const [isSlDisabled, setSlDisabled] = useState(false);
  const [isMlDisabled, setMlDisabled] = useState(false);
  const [isNmDisabled, setNmDisabled] = useState(false);
  const [isChbDisabled, setChbDisabled] = useState(false);

  const [oldIndex, setOldIndex] = useState();

  const handleSelectedImage = (e) => {
    const file = e.target.files[0];
    setValue("template_image", file);
    setImgUrl(URL.createObjectURL(file));
  };

  function getFormData(data) {
    const formData = new FormData();
    for (const key in data) {
      if (key === "questions") formData.append(key, JSON.stringify(data[key]));
      else formData.append(key, data[key]);
    }
    return formData;
  }

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
    getLength("single_line") == 3 && setSlDisabled(true);
  };

  const addMultiLineField = () => {
    questions.append({
      question: "Question",
      type: "multi_line",
    });
    getLength("multi_line") == 3 && setMlDisabled(true);
  };

  const addNumericField = () => {
    questions.append({
      question: "Question",
      type: "numeric",
    });

    getLength("numeric") == 3 && setNmDisabled(true);
  };
  const addCheckboxField = () => {
    questions.append({
      question: "Question",
      type: "checkbox",
      options: [{ name: "Option 1" }],
    });

    (getLength("checkbox") == 3) == 3 && setChbDisabled(true);
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

  const onSubmit = async (data) => {
    data.questions.forEach((item, index) => {
      item.order = index;
    });
    const formData = getFormData({ ...data, author_id: user.id });
    await createTemplate(formData);
  };

  return (
    <div className="bg-zinc-100 py-20">
      <FormProvider {...methods}>
        <div className="w-2/3 mx-auto h-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="p-5">
              <CardHeader className="grid gap-4 break-all">
                <label
                  className="focus:outline-none cursor-text pb-10 text-4xl font-bold tracking-tight lg:text-5xl"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => handleTitleChange(e)}
                >
                  {values.template_name}
                </label>

                <label
                  className="focus:outline-none cursor-text pb-10  leading-7 text-xl"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => handleDescriptionChange(e)}
                >
                  {values.template_description}
                </label>
                <Select onValueChange={(value) => setValue("topic_id", value)}>
                  <SelectTrigger className="w-full border-dashed focus-visible:ring-offset-0 focus-visible:ring-0">
                    <SelectValue placeholder="Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm/6 font-medium text-gray-900"
                  ></label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {!imageUrl ? (
                        <Icon
                          icon="lucide:image-up"
                          aria-hidden="true"
                          className="mx-auto size-12 text-gray-300"
                        />
                      ) : (
                        <img src={imageUrl} className="w-1/2 rounded mx-auto" />
                      )}
                      <div className="mt-4 flex justify-center text-sm/6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 hover:text-blue-500"
                        >
                          <span>Upload a cover image</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/png, image/jpeg"
                            onChange={handleSelectedImage}
                          />
                        </label>
                      </div>
                      <p className="text-xs/5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
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
                      <Questions
                        key={field.id}
                        field={field}
                        question_index={index}
                        setOldIndex={setOldIndex}
                      />
                    ))}
                  </AnimatePresence>
                </Reorder.Group>

                <div className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="bg-zinc-400 rounded-full hover:bg-zinc-500 p-3 text-white">
                      <Icon icon="lucide:plus"></Icon>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={addSingleLineField}
                        disabled={isSlDisabled}
                      >
                        Single Line
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={addMultiLineField}
                        disabled={isMlDisabled}
                      >
                        Multi Line
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={addNumericField}
                        disabled={isNmDisabled}
                      >
                        Numeric
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={addCheckboxField}
                        disabled={isChbDisabled}
                      >
                        Checkbox
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Icon
                      icon="lucide:loader-circle"
                      className="animate-spin"
                    />
                  )}
                  Create Template
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
