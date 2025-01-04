import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useLogoutMutation } from "@/state/slices/auth/authApiSlice";
import { clearCredentials } from "@/state/slices/auth/authSlice";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function NavUser({ user }) {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const callToast = (variant, message) => {
    toast({
      variant: variant,
      description: message,
    });
  };

  const logoutUser = async () => {
    try {
      const res = await logout().unwrap();
      navigate("/");
      callToast("success", res.message);
      localStorage.removeItem("redirectAfterLogin");
      dispatch(clearCredentials());
    } catch (error) {
      callToast("destructive", error.data.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 border-2 rounded-full hover:border-blue-500 text-zinc-300 hover:text-blue-500 transition-all duration-500">
          <Icon className="size-6 cursor-pointer " icon="lucide:user" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={4}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs text-zinc-500 italic">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutUser}>
          <Icon icon="lucide:log-out" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
