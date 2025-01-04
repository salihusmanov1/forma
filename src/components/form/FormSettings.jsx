import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { useUpdateFormMutation } from "@/state/slices/forms/formApiSlice";

function FormSettings({ id, allowedEmails, handleSubmit, form }) {
  const [copied, setCopied] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [inputEmail, setInputEmail] = useState("");
  const [formLink, setFormLink] = useState();
  const [updateForm, { isLoading }] = useUpdateFormMutation();

  useEffect(() => {
    setFormLink(`${window.location.origin}/${id}`);
    setIsPublic(form.data.is_public);
  }, [id, form]);

  console.log(allowedEmails.fields);

  const setToPublic = (e) => {
    e.preventDefault();
    setIsPublic(true);
    allowedEmails.replace([]);
  };

  const addEmail = (e) => {
    e.preventDefault();
    allowedEmails.append({ user_email: inputEmail });
    setInputEmail("");
  };

  const removeEmail = (e, index) => {
    e.preventDefault();
    allowedEmails.remove(index);
  };

  const onSubmit = async (data) => {
    console.log(data);

    await updateForm({
      id,
      form: { allowedEmails: data.allowedEmails, is_public: isPublic },
    });
  };

  return (
    <div>
      <div className="w-full sm:w-2/3 mx-auto h-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="lucide:users" className="w-5 h-5" />
                Share form
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={setToPublic}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                      isPublic
                        ? "bg-blue-100 text-blue-700  hover:bg-blue-100 hover:text-blue-700"
                        : "bg-gray-100 text-gray-700  hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    <Icon icon="lucide:globe" className="w-4 h-4" />
                    Public
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsPublic(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                      !isPublic
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700"
                        : "bg-gray-100 text-gray-700  hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    <Icon icon="lucide:lock" className="w-4 h-4" />
                    Private
                  </Button>
                </div>

                {isPublic ? (
                  <p className="text-sm text-gray-600">
                    Anyone with the link can access this form
                  </p>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Only specified people can access
                    </p>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                        placeholder="Add email address"
                        className="flex-1"
                      />
                      <Button
                        onClick={addEmail}
                        type="button"
                        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
                <Icon
                  icon="lucide:link"
                  className="w-4 h-4 text-gray-500 flex-shrink-0"
                />
                <Input
                  type="text"
                  value={formLink}
                  readOnly
                  className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                />
                <button className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  {copied ? (
                    <>
                      <Icon icon="lucide:check" className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Icon icon="lucide:copy" className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2">
                {allowedEmails.fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          <Icon icon="lucide:mail" className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="text-sm font-medium">
                          {field.user_email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0"
                              onClick={(e) => removeEmail(e, index)}
                            >
                              <Icon icon="lucide:x" className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remove access</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && (
                  <Icon icon="lucide:loader-circle" className="animate-spin" />
                )}
                Save
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}

export default FormSettings;
