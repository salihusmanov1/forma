import TemplateQuestions from "@/components/template/TemplateQuestions";
import TemplateSettings from "@/components/template/TemplateSettings";
import { useParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  useCreateTemplateMutation,
  useGetTemplateQuery,
} from "@/state/slices/templates/templatesApiSlice";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "@/state/slices/auth/authModalSlice";
import { useCreateFormMutation } from "@/state/slices/forms/formApiSlice";
import { FormProvider, useForm } from "react-hook-form";

export default function Template() {
  let { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data: template, refetch } = useGetTemplateQuery(id, { skip: !id });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createForm, { isLoading: formLoading }] = useCreateFormMutation();
  const [createTemplate, { isLoading: templateLoading }] =
    useCreateTemplateMutation();
  const [imageUrl, setImgUrl] = useState("");

  const methods = useForm({
    defaultValues: async () => {
      if (!template) {
        return {
          questions: [{ question: "Question", type: "single_line" }],
          template_name: "Template Title",
          template_description: "Template Description",
        };
      }
      return template.data;
    },
  });
  const { reset } = methods;

  useEffect(() => {
    if (template?.data) {
      reset(template.data);
    }
  }, [reset, template?.data, id]);

  useEffect(() => {
    id && refetch();
  }, [id, refetch]);

  function getFormData(data) {
    const formData = new FormData();
    for (const key in data) {
      if (key === "questions") formData.append(key, JSON.stringify(data[key]));
      else formData.append(key, data[key]);
    }
    return formData;
  }

  const createNewForm = async () => {
    if (!user) {
      return dispatch(openLoginModal());
    }
    try {
      const res = await createForm({
        template_id: id,
        user_id: user.id,
      }).unwrap();
      navigate(`/form/${res.data.id}`);
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      data.questions.forEach((item, index) => {
        item.order = index;
      });
      const formData = getFormData({ ...data, author_id: user.id });
      const template = await createTemplate(formData).unwrap();
      const form = await createForm({
        template_id: template.data.id,
        user_id: user.id,
      }).unwrap();
      navigate(`/form/${form.data.id}`);
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  return (
    <div className="bg-zinc-100 py-10 min-h-screen">
      <Tabs defaultValue="questions" className="w-full">
        {(user.id == template?.data.author_id || !id) && (
          <TabsList className="grid w-[320px] grid-cols-2 mx-auto">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        )}
        <FormProvider {...methods}>
          <TabsContent value="questions">
            <TemplateQuestions
              id={id}
              onSubmit={onSubmit}
              createNewForm={createNewForm}
              formLoading={formLoading}
              templateLoading={templateLoading}
            />
          </TabsContent>
          <TabsContent value="settings">
            <TemplateSettings
              id={id}
              template={template}
              imageUrl={imageUrl}
              setImgUrl={setImgUrl}
            />
          </TabsContent>
        </FormProvider>
      </Tabs>
    </div>
  );
}