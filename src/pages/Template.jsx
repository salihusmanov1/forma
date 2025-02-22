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
import { useToast } from "@/hooks/use-toast";
import { Icon } from "@iconify/react";
import { callToast } from "@/utils.js/toastUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object({
  tags: Yup.array()
    .max(3, "You can select up to 3 tags only")
    .min(1, "At least one tag is required"),
});

export default function Template() {
  let { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const {
    data: template,
    refetch,
    error,
    isLoading,
  } = useGetTemplateQuery(id, { skip: !id });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createForm, { isLoading: formLoading }] = useCreateFormMutation();
  const [createTemplate, { isLoading: templateLoading }] =
    useCreateTemplateMutation();
  const [imageUrl, setImgUrl] = useState("");
  const [activeTab, setActiveTab] = useState("questions");
  const { toast } = useToast();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: async () => {
      if (!template) {
        return {
          questions: [{ question: "Question", type: "single_line" }],
          template_name: "Template Title",
          template_description: "Template Description",
          tags: [],
        };
      }
      return template.data;
    },
  });
  const {
    reset,
    formState: { errors },
  } = methods;

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
      if (key === "questions" || key === "tags")
        formData.append(key, JSON.stringify(data[key]));
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
    if (!user) {
      return dispatch(openLoginModal());
    }
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
      callToast(toast, "destructive", error?.data.message);
    }
  };

  if (error?.status === 404)
    return (
      <div className="m-12">
        <h1 className="text-4xl font-bold">Not Found</h1>
      </div>
    );

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Icon
          icon="lucide:loader-circle"
          className="animate-spin text-blue-500 size-10"
        />
      </div>
    );

  return (
    <div className="bg-zinc-100 py-10 min-h-screen">
      <Tabs
        defaultValue="questions"
        className="w-full"
        onValueChange={setActiveTab}
      >
        {!id && (
          <TabsList className="grid w-[320px] grid-cols-2 mx-auto">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger className="relative" value="settings">
              <p
                className={
                  errors?.tags && activeTab !== "settings" ? "text-red-500" : ""
                }
              >
                Settings
              </p>
              {errors?.tags && activeTab !== "settings" && (
                <Icon
                  className="absolute -top-1 -right-1 text-red-600"
                  icon="lucide:circle-alert"
                />
              )}
            </TabsTrigger>
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
              onSubmit={onSubmit}
              validationErrors={errors}
            />
          </TabsContent>
        </FormProvider>
      </Tabs>
    </div>
  );
}
