import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "@/state/slices/auth/apiSlice";
import { setCredentials } from "@/state/slices/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  closeLoginModal,
  openRegistrationModal,
} from "@/state/slices/auth/authModalSlice";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("This field is required"),
  password: Yup.string().required("This field is required."),
});

function Login({ isOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { user } = useSelector((state) => state.auth);

  const closeLogin = () => {
    dispatch(closeLoginModal());
  };

  const openRegister = () => {
    dispatch(openRegistrationModal());
    closeLogin();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res.user));
      closeLogin();
      navigate("/main");
    } catch (error) {}
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={closeLogin}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Enter your email below to login to your account
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  className={`${
                    errors.password &&
                    "focus-visible:ring-red-400 focus:border-red-400 border-red-400"
                  }`}
                />
                <div
                  className={`${
                    errors.email
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  } ml-1 transition-all duration-200 ease-out text-red-500 font-semibold text-sm`}
                >
                  {errors.email?.message}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={`${
                    errors.password &&
                    "focus-visible:ring-red-400 focus:border-red-400 border-red-400"
                  }`}
                />
                <div
                  className={`${
                    errors.password
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  } ml-1 transition-all duration-200 ease-out text-red-500 font-semibold text-sm`}
                >
                  {errors.password?.message}
                </div>
              </div>
              <div className="grid gap-2">
                <Button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-500"
                >
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?&nbsp;
            <Button variant="link" className="px-0" onClick={openRegister}>
              Sign up
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Login;
