import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { useGetFormQuery } from "@/state/slices/forms/formApiSlice";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useGetResponseQuery } from "@/state/slices/forms/responseApiSlice";
import { useSelector } from "react-redux";
import SingleLineField from "@/components/response/SingleLineField";
import MultiLineField from "@/components/response/MultiLineField";
import NumericField from "@/components/response/NumericField";
import CheckboxField from "@/components/response/CheckboxField";
import {
  useCreateResponseMutation,
  useUpdateResponseMutation,
} from "@/state/slices/forms/responseApiSlice";
import { callToast } from "@/utils.js/toastUtils";
import { useToast } from "@/hooks/use-toast";

function ResponseForm() {
  let { id } = useParams();
  const { data: form, error, isLoading } = useGetFormQuery(id);
  const { user } = useSelector((state) => state.auth);
  const { data: response, refetch } = useGetResponseQuery({
    id,
    userId: user.id,
  });
  const methods = useForm({
    defaultValues: {
      respondent_id: user.id,
      form_id: id,
      answers: [],
    },
  });

  const {
    getValues,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [isEditMode, setEditMode] = useState(false);
  const { toast } = useToast();
  const [createResponse, { isLoading: createLoading }] =
    useCreateResponseMutation();
  const [updateResponse, { isLoading: updateLoading }] =
    useUpdateResponseMutation();

  const onSubmitResponse = async (data) => {
    try {
      let res;
      if (isEditMode) {
        res = await updateResponse({ id: response.data.id, ...data }).unwrap();
      } else {
        res = await createResponse({
          ...data,
        }).unwrap();
      }
      callToast(toast, "success", res.message);
      refetch();
    } catch (error) {
      callToast(toast, "destructive", error.data.message);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Icon
          icon="lucide:loader-circle"
          className="animate-spin text-blue-500 size-10"
        />
      </div>
    );

  if (error?.status === 403)
    return (
      <div className="m-12">
        <h1 className="text-4xl font-bold">Access Denied!</h1>
      </div>
    );

  return (
    <div className="bg-zinc-100 py-10 min-h-screen">
      <div className="w-full sm:w-2/3 mx-auto h-full">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitResponse)}>
            <Card className="p-5">
              <CardHeader className="grid gap-4 break-all">
                <label className="focus:outline-none pb-6 text-4xl font-bold tracking-tight lg:text-5xl">
                  {form?.data.template.template_name}
                </label>

                <label className="focus:outline-none pb-10 leading-7 text-2xl">
                  {form?.data.template.template_description}
                </label>
              </CardHeader>
              <CardContent className="grid gap-4">
                {form?.data.template.questions.map((field, index) => {
                  const filteredResponse = response?.data?.answers.find(
                    (a) => a.question_id === field.id
                  );

                  return (
                    <div key={field.id} className="grid gap-2 py-4">
                      <div className="flex font-medium">
                        <p className="mr-2 mb-2">{index + 1}.</p>
                        <label className="focus:outline-none">
                          {field.question}
                        </label>
                      </div>
                      {field.type === "single_line" && (
                        <SingleLineField
                          isDisabled={false}
                          index={index}
                          field={field}
                          response={filteredResponse}
                        />
                      )}
                      {field.type === "multi_line" && (
                        <MultiLineField
                          isDisabled={false}
                          index={index}
                          field={field}
                          response={filteredResponse}
                        />
                      )}
                      {field.type === "numeric" && (
                        <NumericField
                          isDisabled={false}
                          index={index}
                          field={field}
                          response={filteredResponse}
                        />
                      )}
                      {field.type === "checkbox" && (
                        <div>
                          {field.options.map((option, option_index) => (
                            <div key={option_index} className="grid gap-4 p-2">
                              <CheckboxField
                                index={index}
                                option_index={option_index}
                                option={option}
                                field={field}
                                isDisabled={false}
                                answers={response?.data?.answers.filter(
                                  (a) => a.question_id == field.id
                                )}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
              <CardFooter>
                {response?.data ? (
                  <Button type="submit" onClick={() => setEditMode(true)}>
                    {updateLoading && (
                      <Icon
                        icon="lucide:loader-circle"
                        className="animate-spin"
                      />
                    )}
                    Update
                  </Button>
                ) : (
                  <Button type="submit" onClick={() => setEditMode(false)}>
                    {createLoading && (
                      <Icon
                        icon="lucide:loader-circle"
                        className="animate-spin"
                      />
                    )}
                    Submit
                  </Button>
                )}
              </CardFooter>
            </Card>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default ResponseForm;
