import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/react";
import { Link } from "react-router";
import { format } from "date-fns";

function FormResponses({ responses }) {
  return (
    <div className="w-full sm:w-2/3 mx-auto h-full">
      <Card className="min-h-[420px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon icon="lucide:files" className="w-5 h-5" />
            Form responses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="m-2 text-zinc-500 font-medium">
            ({responses.length}) responses
          </div>
          <ul className="grid gap-2">
            {responses.map((response, index) => (
              <li
                key={index}
                className="grid grid-cols-3 bg-zinc-50 p-2 rounded-lg"
              >
                <div className="flex items-center col-span-2">
                  <Icon icon="lucide:mail" className="mr-2" />
                  <div>{response.respondent.email}</div>
                </div>
                <div className="flex items-center justify-end col-span-1">
                  <div>
                    {format(new Date(response.updatedAt), "dd/MM/yyyy H:m")}
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link to="/dashboard" className="ml-4">
                          <Icon
                            icon="lucide:file-text"
                            className="text-blue-500"
                          />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View response</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default FormResponses;
