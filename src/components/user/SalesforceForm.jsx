import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useCreateContactMutation } from "@/state/slices/salesforce/sfApiSlice";
import { useToast } from "@/hooks/use-toast";
import { callToast } from "@/utils.js/toastUtils";
import { Icon } from "@iconify/react";

function SalesforceForm({ setIsFormOpen, isFormOpen }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { name: "Forma" },
  });
  const [createContact, { isLoading }] = useCreateContactMutation();
  const { toast } = useToast();

  const onSubmit = async (data) => {
    try {
      const res = await createContact(data).unwrap();
      callToast(toast, "success", res.message);
    } catch (error) {
      callToast(toast, "destructive", error.data.message);
    }
  };

  return (
    <div>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Salesforce Contact</DialogTitle>
            <DialogDescription>
              Enter your information to create a Salesforce contact.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  {...register("firstName")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  {...register("lastName")}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                {...register("email")}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                pattern="\+\d{1,15}"
                {...register("phone")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" name="title" {...register("title")} />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading && (
                  <Icon icon="lucide:loader-circle" className="animate-spin" />
                )}
                Create Contact
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SalesforceForm;
