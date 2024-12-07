import { Button } from "../components/ui/button";
import {
  openRegistrationModal,
  openLoginModal,
} from "@/state/slices/auth/authModalSlice";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const openRegister = () => {
    dispatch(openRegistrationModal());
  };
  const openLogin = () => {
    dispatch(openLoginModal());
  };

  return (
    <>
      <div className="h-2/3 flex flex-col gap-y-12 justify-center items-center">
        <div className="w-1/2 text-center text-2xl lg:text-5xl text-slate-800 font-extrabold">
          Create, Customize, Collect
          <div className="text-lg text-slate-800 font-semibold mt-8">
            Simplify data collection with
            <span className="text-blue-700  font-bold"> Forma</span>! Design
            forms your way, gather responses effortlessly, and analyze data in
            real-time. Perfect for surveys, feedback, and more.
          </div>
        </div>

        <div className="flex gap-2">
          {/* <Button className="bg-slate-700" onClick={openLogin}>
            Login
          </Button>
          <Button className="bg-slate-700" onClick={openRegister}>
            Register
          </Button> */}
          <Button className="bg-blue-700 text-md" onClick={openRegister}>
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
}
export default Home;
