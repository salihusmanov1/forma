import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import FormCheckbox from "./FormCheckbox";

function FormQuestions({ id, isDisabled, form }) {
  const { user } = useSelector((state) => state.auth);
  const methods = useForm();
  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    reset,
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="w-full sm:w-2/3 mx-auto h-full">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="p-5">
            <CardHeader className="grid gap-4 break-all">
              <label className="focus:outline-none pb-10 text-4xl font-bold tracking-tight lg:text-5xl">
                {form?.data.template.template_name}
              </label>

              <label className="focus:outline-none pb-10 leading-7 text-xl">
                {form?.data.template.template_description}
              </label>
            </CardHeader>
            <CardContent className="grid gap-4">
              {form?.data.template.questions.map((field, index) => (
                <div key={field.id} className="grid gap-2 p-4">
                  <div className="flex font-medium">
                    <p className="mr-2 mb-2">{index + 1}.</p>
                    <label className="focus:outline-none">
                      {field.question}
                    </label>
                  </div>
                  {field.type === "single_line" && (
                    <div>
                      <Input
                        type="text"
                        {...register(`${field.id}`)}
                        disabled={isDisabled}
                        className={
                          isDisabled
                            ? "disabled:cursor-auto disabled:opacity-100"
                            : ""
                        }
                      />
                    </div>
                  )}
                  {field.type === "multi_line" && (
                    <div>
                      <Textarea
                        rows="3"
                        {...register(`${field.id}`)}
                        disabled={isDisabled}
                        className={
                          isDisabled
                            ? "disabled:cursor-auto disabled:opacity-100"
                            : ""
                        }
                      />
                    </div>
                  )}
                  {field.type === "numeric" && (
                    <div>
                      <Input
                        type="number"
                        min="0"
                        className={`lg:w-1/3 ${
                          isDisabled
                            ? "disabled:cursor-auto disabled:opacity-100"
                            : ""
                        }`}
                        {...register(`${field.id}`)}
                        disabled={isDisabled}
                      />
                    </div>
                  )}
                  {field.type === "checkbox" && (
                    <div>
                      {field.options.map((option, option_index) => (
                        <div key={option_index} className="grid gap-4 p-2">
                          <FormCheckbox
                            index={index}
                            option_index={option_index}
                            option={option}
                            field={field}
                            isDisabled={isDisabled}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              {!isDisabled && (
                <Button type="submit">
                  {/* {isLoading && (
                    <Icon
                      icon="lucide:loader-circle"
                      className="animate-spin"
                    />
                  )} */}
                  Submit
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
}

export default FormQuestions;
