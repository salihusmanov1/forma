import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteFormMutation,
  useGetFormsQuery,
} from "@/state/slices/forms/formApiSlice";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import { useToast } from "@/hooks/use-toast";
import { callToast } from "@/utils.js/toastUtils";

function UserDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { data: forms, isLoading, refetch } = useGetFormsQuery(user.id);
  const [deleteForm] = useDeleteFormMutation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const removeForm = async (id) => {
    try {
      const res = await deleteForm(id).unwrap();
      callToast(toast, "success", res.message);
      refetch();
    } catch (error) {
      callToast(toast, "destructive", error.data.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue="forms">
        <TabsList>
          <TabsTrigger value="forms">My Forms</TabsTrigger>
          <TabsTrigger value="templates">My Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="forms" className="space-y-6">
          <div className="m-6 grid gap-4">
            <h2 className="text-2xl font-bold">My Forms</h2>
            <Table>
              <TableCaption>A list of your recent forms.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right">Created At</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <div>
                    <Icon
                      className="text-blue-500"
                      icon="lucide:loader-circle"
                    />
                  </div>
                ) : (
                  forms?.data.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell
                        className="font-medium underline cursor-pointer"
                        onClick={() => navigate(`/form/${form.id}`)}
                      >
                        {form.id}
                      </TableCell>
                      <TableCell className="text-right">
                        {form.is_public ? "Public" : "Private"}
                      </TableCell>
                      <TableCell className="text-right">
                        {format(new Date(form.createdAt), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell className="text-right flex justify-end">
                        <Icon
                          className="text-red-500 cursor-pointer"
                          icon="lucide:trash-2"
                          onClick={() => removeForm(form.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              <TableFooter>
                {/* <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow> */}
              </TableFooter>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          {/* <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">My Templates</h2>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Template
            </Button>
          </div>
          <TemplatesGrid /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default UserDashboard;
