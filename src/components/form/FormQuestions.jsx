import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

function FormQuestions({ form }) {
  return (
    <div className="w-full sm:w-2/3 mx-auto h-full">
      <Card className="p-5">
        <CardHeader className="grid gap-4 px-8 break-all">
          <label className="focus:outline-none pb-6 text-4xl font-bold tracking-tight lg:text-5xl">
            {form?.data.template.template_name}
          </label>

          <label className="focus:outline-none pb-10 leading-7 text-2xl">
            {form?.data.template.template_description}
          </label>
        </CardHeader>
        <CardContent className="grid gap-4">
          {form?.data.template.questions.map((field, index) => {
            return (
              <div key={field.id} className="grid gap-2 py-4">
                <div className="flex font-medium">
                  <p className="mr-2 mb-2">{index + 1}.</p>
                  <label className="focus:outline-none">{field.question}</label>
                </div>
                {field.type === "single_line" && (
                  <Input
                    type="text"
                    disabled
                    className="disabled:cursor-auto disabled:opacity-100"
                  />
                )}
                {field.type === "multi_line" && (
                  <Textarea
                    disabled
                    rows="3"
                    className="disabled:cursor-auto disabled:opacity-100"
                  />
                )}
                {field.type === "numeric" && (
                  <Input
                    type="id"
                    disabled
                    className="disabled:cursor-auto disabled:opacity-100 lg:w-1/3"
                  />
                )}
                {field.type === "checkbox" && (
                  <div>
                    {field.options.map((option, option_index) => (
                      <div key={option_index} className="grid gap-4 p-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${index}_${option_index}`}
                            disabled
                            className="disabled:cursor-auto"
                          />

                          <label
                            htmlFor={`${index}_${option_index}`}
                            className="text-sm font-medium leading-none focus:outline-none cursor-text"
                          >
                            {option.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

export default FormQuestions;
