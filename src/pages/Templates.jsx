import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { useGetTemplatesQuery } from "@/state/slices/templates/templatesApiSlice";
import TemplatesSkeleton from "@/components/ui/skeletons/TemplatesSkeleton";

export default function Templates() {
  const { data: templates, isLoading } = useGetTemplatesQuery();
  const navigate = useNavigate();

  const navigateToNew = () => {
    navigate("/template", { state: { from: window.location.pathname } });
  };

  const navigateToExisting = (id) => {
    navigate(`/template/${id}`, { state: { from: window.location.pathname } });
  };

  return (
    <div className="mx-auto p-10 lg:p-20">
      <div className="flex gap-2 w-full lg:w-1/2 mx-auto">
        <Input type="text" placeholder="Search in All Form Templates"></Input>
        <Button className="bg-gray-600 hover:bg-gray-500">
          <Icon icon="lucide:search" />
        </Button>
      </div>
      <div className="my-5 flex justify-end">
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          onClick={navigateToNew}
        >
          <Icon icon="lucide:plus" /> Create Template
        </Button>
      </div>
      {isLoading ? (
        <TemplatesSkeleton />
      ) : templates?.data.length > 0 ? (
        <div className="my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.data.map((template) => (
            <Card
              key={template.id}
              className="w-full max-w-sm mx-auto h-[26rem]"
            >
              <CardHeader className="p-0 border-b">
                <img
                  src={
                    template.image_url
                      ? template.image_url
                      : "src/assets/file.png"
                  }
                  alt={template.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </CardHeader>
              <CardContent className="p-6 space-y-4 h-[14rem]">
                <div className="space-y-2 ">
                  <h3 className="text-2xl font-semibold tracking-tight line-clamp-3">
                    {template.template_name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {template.template_description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Icon icon="lucide:mail" className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {template.author.name}
                  </span>
                </div>
                {template.tags.length > 0 && (
                  <div className="flex flex-nowrap gap-2 overflow-hidden">
                    {template.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-2 py-1"
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={() => navigateToExisting(template.id)}
                >
                  Show
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div>No templates available.</div>
      )}
    </div>
  );
}
