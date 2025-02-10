import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useGetTopicsQuery } from "@/state/slices/topics/topicsApiSlice";
import Tags from "./Tags";
import { useGetTagsQuery } from "@/state/slices/tags/tagsApiSlice";

function TemplateSettings({ template, imageUrl, setImgUrl, validationErrors }) {
  const { setValue, watch } = useFormContext();
  const topic = watch("topic_id");
  const { data: topics } = useGetTopicsQuery();
  const { data: tags } = useGetTagsQuery();

  useEffect(() => {
    if (template?.data.image_url) {
      setImgUrl(template.data.image_url);
    }
  }, [template?.data, setImgUrl]);

  const handleSelectedImage = (e) => {
    const file = e.target.files[0];
    setValue("template_image", file);
    setImgUrl(URL.createObjectURL(file));
  };
  return (
    <div className="w-full sm:w-2/3 mx-auto h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center w-full">
            <Label htmlFor="topic" className="w-[64px]">
              Topic
            </Label>
            <Select
              value={topic}
              id="topic"
              onValueChange={(value) => setValue("topic_id", value)}
            >
              <SelectTrigger className="focus-visible:ring-offset-0 focus-visible:ring-0">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {topics?.data.map((item, index) => (
                  <SelectItem key={index} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-start">
            <Label htmlFor="image" className="mt-2 w-[64px]">
              Image
            </Label>
            <div
              id="image"
              className="w-full mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
            >
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
          <div className="w-full">
            <div className="flex items-center">
              <Label htmlFor="tags" className="w-[64px]">
                Tags
              </Label>
              <Tags tagList={tags} />
            </div>

            {validationErrors && (
              <p className="text-xs font-medium text-red-500 ml-[64px]">
                {validationErrors?.tags?.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TemplateSettings;
