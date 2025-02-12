import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import { useGetTemplatesQuery } from "@/state/slices/templates/templatesApiSlice";
import TemplatesSkeleton from "@/components/ui/skeletons/TemplatesSkeleton";
import TemplateCard from "@/components/template/TemplateCard";

export default function Templates() {
  const { data: templates, isLoading } = useGetTemplatesQuery();
  const navigate = useNavigate();

  const navigateToNew = () => {
    navigate("/template", { state: { from: window.location.pathname } });
  };

  return (
    <div className="mx-auto p-10 lg:px-20">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center my-5 gap-5">
        <div className="flex gap-2 w-full md:w-1/2">
          <Input type="text" placeholder="Search in All Form Templates"></Input>
          <Button className="bg-gray-600 hover:bg-gray-500">
            <Icon icon="lucide:search" />
          </Button>
        </div>

        <Button
          className="bg-blue-500 hover:bg-blue-600 flex self-start"
          onClick={navigateToNew}
        >
          <Icon icon="lucide:plus" /> Create Template
        </Button>
      </div>
      {isLoading ? (
        <TemplatesSkeleton />
      ) : templates?.data.length > 0 ? (
        <div>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Most Used Templates
            </h4>
            <div className="my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.data
                .filter((template) => template.formCount > 0)
                .sort((a, b) => b.formCount - a.formCount)
                .map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
            </div>
          </div>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Recent Templates
            </h4>
            <div className="my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.data.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>No templates available.</div>
      )}
    </div>
  );
}
