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
import { Icon } from "@iconify/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCreateTemplateMutation } from "@/state/slices/templates/templatesApiSlice";
import { useSelector } from "react-redux";

export default function Template() {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  const [imageUrl, setImgUrl] = useState(null);
  const [createTemplate, { isLoading }] = useCreateTemplateMutation();
  // const [textFields, setTextFields] = useState([
  //   { order: 1, state: true, question: "hhsgergretrt" },
  //   { order: 2, state: false, question: "" },
  //   { order: 3, state: false, question: "" },
  //   { order: 4, state: false, question: "" },
  // ]);

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

  const onSubmit = async (data) => {
    const formData = getFormType({ ...data, author_id: user.id });
    console.log(formData);

    await createTemplate(formData);
  };

  return (
    <div className="w-2/3 mx-auto h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="my-20">
          <CardHeader className="grid gap-4">
            <Input
              {...register("template_name")}
              id="title"
              type="text"
              placeholder="Title"
              className="h-16 md:text-4xl border-dashed focus-visible:ring-offset-0 focus-visible:ring-0"
            ></Input>

            <Textarea
              {...register("template_description")}
              type="text"
              placeholder="Description"
              className="md:text-2xl border-dashed focus-visible:ring-offset-0 focus-visible:ring-0"
            />
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
          <CardContent>
            {/* <div className="grid w-full items-center gap-1.5">
              {textFields.map(
                (field) =>
                  field.state && (
                    <div
                      key={field.order}
                      className="p-2 hover:border-2 rounded-lg border-current cursor-grab"
                    >
                      <Label htmlFor="picture">
                        {field.order} {field.question}
                      </Label>
                      <Input id="picture" type="text" />
                    </div>
                  )
              )}
            </div> */}
          </CardContent>
          <CardFooter>
            <Button>Create Template</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
