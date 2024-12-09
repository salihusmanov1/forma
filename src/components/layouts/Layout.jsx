import { NavLink, Outlet, useLocation } from "react-router";
import { Button } from "../ui/button";
import { openLoginModal } from "@/state/slices/auth/authModalSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const openLogin = () => {
    dispatch(openLoginModal());
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const useIsActive = () => {
    const { pathname } = useLocation();
    return pathname;
  };

  return (
    <div className="h-screen">
      <nav className="bg-white border-b drop-shadow-md">
        <div className="mx-auto max-w-7xl px-2 sm:pl-6 lg:pl-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isSidebarOpen}
                onClick={toggleSidebar}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
              <div className="flex shrink-0 items-center">
                <div className="text-blue-700 font-extrabold text-xl">
                  Forma
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-2">
                  <NavLink
                    to="/"
                    className="rounded-md group px-3 py-2 text-md font-medium text-blue-700 "
                    aria-current="page"
                  >
                    Home
                    <span
                      className={`${
                        useIsActive() === "/"
                          ? "block group:max-w-full"
                          : "block max-w-0 group-hover:max-w-full "
                      } transition-all duration-500 h-0.5 bg-blue-700`}
                    ></span>
                  </NavLink>
                  <NavLink
                    to="/main"
                    className="rounded-md group px-3 py-2 text-md font-medium text-blue-700 "
                  >
                    Templates
                    <span
                      className={`${
                        useIsActive() === "/main"
                          ? "block max-w-full"
                          : "block max-w-0 group-hover:max-w-full "
                      } transition-all duration-500 h-0.5 bg-blue-700`}
                    ></span>
                  </NavLink>
                  <Button
                    onClick={openLogin}
                    className="rounded-md bg-amber-500 text-base text-white hover:bg-amber-600 hover:text-white"
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isSidebarOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <NavLink
                to="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200"
              >
                Home
              </NavLink>
              <NavLink
                to="/main"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200"
              >
                Templates
              </NavLink>
            </div>
          </div>
        )}
      </nav>
      <div className="container-lg">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
