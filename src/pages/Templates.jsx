import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import { useGetTemplatesQuery } from "@/state/slices/templates/templatesApiSlice";

export default function Templates() {
  const { data: templates, isLoading } = useGetTemplatesQuery();
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("/template", { state: { from: window.location.pathname } });
  };

  return (
    <div className=" mx-auto p-10 lg:p-20">
      <div className="flex gap-2 w-full lg:w-1/2 mx-auto">
        <Input type="text" placeholder="Search in All Form Templates"></Input>
        <Button className="bg-gray-600 hover:bg-gray-500">
          <Icon icon="lucide:search" />
        </Button>
      </div>
      <div className="my-5 flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-500" onClick={navigateTo}>
          <Icon icon="lucide:plus" /> Create Template
        </Button>
      </div>
      <div className="my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates?.data.length > 0 ? (
          templates.data.map((template) => (
            <Card key={template.id} className="w-full max-w-sm mx-auto">
              <CardContent className="p-2 grid gap-4">
                <img
                  src={template.image_url}
                  alt={template.title}
                  className="w-full h-32 object-cover rounded"
                />
                <CardTitle className="min-h-14">
                  {template.template_name}
                </CardTitle>
                <CardDescription className=" line-clamp-3">
                  {template.template_description}
                </CardDescription>
                <div className="text-sm italic">{template.author.name}</div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 items-start mt-2 p-2">
                <Button
                  variant="outline"
                  className="w-full border-blue-700 hover:bg-blue-600 text-blue-700 hover:text-white"
                >
                  Use this template
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div>No templates available.</div>
        )}
      </div>
    </div>
  );
}
