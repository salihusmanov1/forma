import { openLoginModal } from "@/state/slices/auth/authModalSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", location.pathname);
      dispatch(openLoginModal());
      const from = location.state?.from || "/";
      navigate(from);
    }
  }, [user, dispatch, navigate, location]);

  return user ? <Outlet /> : null;
};

export default ProtectedRoutes;
