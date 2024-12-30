import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import FormQuestions from "@/components/form/FormQuestions";
import FormSettings from "@/components/form/FormSettings";

function Form() {
  let { id } = useParams();
  const location = useLocation();
  const isCreator = location.pathname.startsWith("/form");
  return (
    <div className="bg-zinc-100 py-10">
      <Tabs defaultValue="questions" className="w-full">
        {isCreator && (
          <TabsList className="grid w-[320px] mx-auto grid-cols-3 mb-2">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        )}
        <div className="w-2/3 mx-auto h-full">
          <TabsContent value="questions">
            <FormQuestions id={id} isDisabled={isCreator} />
          </TabsContent>
          <TabsContent value="settings">
            <FormSettings id={id} isDisabled={isCreator} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default Form;
