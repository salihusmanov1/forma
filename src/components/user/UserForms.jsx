import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { callToast } from "@/utils.js/toastUtils";
import { useDeleteFormMutation } from "@/state/slices/forms/formApiSlice";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import { useGetFormsQuery } from "@/state/slices/forms/formApiSlice";

function UserForms({ user }) {
  const { data: forms, isLoading, refetch } = useGetFormsQuery(user.id);
  const [deleteForm] = useDeleteFormMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
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
            <TableCell
              colSpan={4}
              className="flex-column items-center justify-items-center"
            >
              <Icon
                className="text-blue-500 animate-spin size-6"
                icon="lucide:loader-circle"
              />
            </TableCell>
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
      </Table>
    </div>
  );
}

export default UserForms;
