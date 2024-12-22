import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useCreateTemplateMutation } from "@/state/slices/templates/templatesApiSlice";
import { useSelector } from "react-redux";
import LineQuestions from "@/components/template/LineQuestions";
import { Label } from "@/components/ui/label";

export default function Template() {
  const { user } = useSelector((state) => state.auth);
  const methods = useForm({
    defaultValues: {
      questions: [{ number: 1, question: " Question", type: "single_line" }],
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
  } = methods;

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

  const handleSelectedImage = (e) => {
    const file = e.target.files[0];
    setValue("template_image", file);
    setImgUrl(URL.createObjectURL(file));
  };

  function getFormType(data) {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  }

  const handleTitleChange = (event) => {
    setValue("template_name", event.target.innerText);
  };
  const handleDescriptionChange = (event) => {
    setValue("template_description", event.target.innerText);
  };

  const addSingleLineField = () => {
    questions.append({
      number: questions.fields.length + 1,
      question: "Question",
      type: "single_line",
    });
    questions.fields.filter((item) => item.type === "single_line").length ==
      3 && setSlDisabled(true);
  };

  const addMultiLineField = () => {
    questions.append({
      number: questions.fields.length + 1,
      question: "Question",
      type: "multi_line",
    });
    questions.fields.filter((item) => item.type === "multi_line").length == 3 &&
      setMlDisabled(true);
  };

  const addNumericField = () => {
    questions.append({
      number: questions.fields.length + 1,
      question: "Question",
      type: "numeric",
    });

    questions.fields.filter((item) => item.type === "numeric").length == 3 &&
      setNmDisabled(true);
  };
  const addCheckboxField = () => {
    questions.append({
      number: questions.fields.length + 1,
      question: "Question",
      type: "checkbox",
      options: [{ name: "Option 1" }],
    });

    questions.fields.filter((item) => item.type === "checkbox").length == 3 &&
      setChbDisabled(true);
  };

  const onSubmit = async (data) => {
    console.log(data);
    // const formData = getFormType({ ...data, author_id: user.id });
    // await createTemplate(formData);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-2/3 mx-auto h-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="my-20">
            <CardHeader className="grid gap-4 m-5 break-all">
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
              <LineQuestions questions={questions} />
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
              <Button type="submit">Create Template</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </FormProvider>
  );
}
