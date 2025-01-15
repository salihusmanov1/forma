import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useState } from "react";
import SalesforceForm from "@/components/user/SalesforceForm";

function UserProfile() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const userData = {
    name: "Alex Johnson",
    title: "Product Designer",
    location: "San Francisco, CA",
    email: "alex@example.com",
    bio: "Product designer focused on creating simple and elegant solutions.",
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <Icon className="w-10 h-10 text-gray-400" icon="lucide:user" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">{userData.name}</h1>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>
            {/* <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button> */}
            <Button
              size="sm"
              onClick={() => setIsFormOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Create Salesforce Contact
            </Button>
          </div>
        </CardContent>
      </Card>
      <SalesforceForm setIsFormOpen={setIsFormOpen} isFormOpen={isFormOpen} />
    </div>
  );
}

export default UserProfile;
