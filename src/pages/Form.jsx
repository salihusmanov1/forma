import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import FormQuestions from "@/components/form/FormQuestions";
import FormSettings from "@/components/form/FormSettings";
import { useFieldArray, useForm } from "react-hook-form";
import { useGetFormQuery } from "@/state/slices/forms/formApiSlice";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

function Form() {
  let { id } = useParams();
  const location = useLocation();
  const isCreator = location.pathname.startsWith("/form");
  const { control, handleSubmit } = useForm();
  const { data: form, error, isLoading } = useGetFormQuery(id);

  const allowedEmails = useFieldArray({
    name: "allowedEmails",
    control,
  });

  useEffect(() => {
    if (form?.data) allowedEmails.replace(form.data.allowed_users);
  }, [form]);

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
      <Tabs defaultValue="questions" className="w-full">
        {isCreator && (
          <TabsList className="grid w-[320px] mx-auto grid-cols-3 mb-2">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        )}
        <div>
          <TabsContent value="questions">
            <FormQuestions id={id} isDisabled={isCreator} form={form} />
          </TabsContent>
          <TabsContent value="settings">
            <FormSettings
              id={id}
              isDisabled={isCreator}
              allowedEmails={allowedEmails}
              handleSubmit={handleSubmit}
              form={form}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default Form;
