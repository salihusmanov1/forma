import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";

import UserForms from "@/components/user/UserForms";
import UserTemplates from "@/components/user/UserTemplates";

function UserDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue="forms">
        <TabsList>
          <TabsTrigger value="forms">My Forms</TabsTrigger>
          <TabsTrigger value="templates">My Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="forms" className="space-y-6">
          <UserForms user={user} />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <UserTemplates user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UserDashboard;
