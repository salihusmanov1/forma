import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUserTemplatesQuery } from "@/state/slices/templates/templatesApiSlice";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { useNavigate } from "react-router";

function UserTemplates({ user }) {
  const {
    data: templates,
    isLoading,
    refetch,
  } = useGetUserTemplatesQuery(user.id);
  const navigate = useNavigate();

  const removeTemplate = async (id) => {
    // try {
    //   const res = await deleteForm(id).unwrap();
    //   callToast(toast, "success", res.message);
    //   refetch();
    // } catch (error) {
    //   callToast(toast, "destructive", error.data.message);
    // }
  };

  return (
    <div className="m-6 grid gap-4">
      <h2 className="text-2xl font-bold">My Forms</h2>
      <Table>
        <TableCaption>A list of your recent forms.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="text-right">Template Name</TableHead>
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
            templates?.data.map((template) => (
              <TableRow key={template.id}>
                <TableCell
                  className="font-medium underline cursor-pointer"
                  onClick={() => navigate(`/templatet/${template.id}`)}
                >
                  {template.id}
                </TableCell>
                <TableCell className="text-right">
                  {template.template_name}
                </TableCell>
                <TableCell className="text-right">
                  {format(new Date(template.createdAt), "dd/MM/yyyy")}
                </TableCell>
                <TableCell className="text-right flex justify-end">
                  <Icon
                    className="text-red-500 cursor-pointer"
                    icon="lucide:trash-2"
                    onClick={() => removeTemplate(template.id)}
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

export default UserTemplates;
