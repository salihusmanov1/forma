import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import TemplateDefaultImage from "@/utils.js/templateDefaultImage";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";

function TemplateCard({ template }) {
  const navigate = useNavigate();
  const navigateToExisting = (id) => {
    navigate(`/template/${id}`, { state: { from: window.location.pathname } });
  };

  return (
    <Card className="w-full max-w-sm mx-auto min-h-[350px]">
      <CardHeader className="p-0 border-b">
        {template.image_url ? (
          <img
            src={template.image_url}
            alt={template.title}
            className="w-full h-32 object-cover rounded-t-lg"
          />
        ) : (
          <TemplateDefaultImage />
        )}
      </CardHeader>
      <CardContent className="py-6 space-y-4 ">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold tracking-tight truncate">
            {template.template_name}
          </h3>
          <div className="flex items-center text-muted-foreground space-x-1 px-2">
            <Icon icon="lucide:repeat-2" />
            <p className="font-medium text-sm">{template.formCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Icon icon="lucide:mail" className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{template.author.email}</span>
        </div>
        {template.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {template.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="px-2 py-1">
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
  );
}

export default TemplateCard;
