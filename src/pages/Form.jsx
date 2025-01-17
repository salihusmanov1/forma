import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router";
import FormQuestions from "@/components/form/FormQuestions";
import FormSettings from "@/components/form/FormSettings";
import { useFieldArray, useForm } from "react-hook-form";
import { useGetFormQuery } from "@/state/slices/forms/formApiSlice";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormResponses from "@/components/form/FormResponses";

function Form() {
  let { id } = useParams();
  const { control, handleSubmit } = useForm();
  const { data: form, error, isLoading } = useGetFormQuery(id);
  const { user } = useSelector((state) => state.auth);
  const [isCreator, setIsCreator] = useState(true);

  const allowedEmails = useFieldArray({
    name: "allowedEmails",
    control,
  });

  useEffect(() => {
    setIsCreator(user.id == form?.data.user_id);
  }, [user.id, form]);

  useEffect(() => {
    if (form?.data) {
      allowedEmails.replace(form.data.allowed_users);
    }
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

  if (error?.status === 403 || !isCreator)
    return (
      <div className="m-12">
        <h1 className="text-4xl font-bold">Access Denied!</h1>
      </div>
    );

  return (
    <div className="bg-zinc-100 min-h-screen">
      <Tabs defaultValue="questions" className="w-full h-full py-10">
        <TabsList className="grid w-[320px] mx-auto grid-cols-3 mb-2">
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <div className="h-full">
          <TabsContent value="questions">
            <FormQuestions id={id} isDisabled={isCreator} form={form} />
          </TabsContent>
          <TabsContent value="responses" className="h-full">
            <FormResponses
              id={id}
              isDisabled={isCreator}
              responses={form?.data.responses}
            />
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
