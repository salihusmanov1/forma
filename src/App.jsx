import Register from "@/auth/Register";
import Login from "@/auth/Login";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

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
    </>
  );
}

export default App;
