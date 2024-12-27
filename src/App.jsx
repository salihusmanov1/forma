import Register from "@/components/auth/Register";
import Login from "@/components/auth/Login";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { Toaster } from "./components/ui/toaster";

function App() {
  const { isLoginModalOpen, isRegistrationModalOpen } = useSelector(
    (state) => state.authModal
  );
  return (
    <>
      <main>
        <Outlet />
        <Login isOpen={isLoginModalOpen} />
        <Register isOpen={isRegistrationModalOpen} />
      </main>
      <Toaster />
    </>
  );
}

export default App;
