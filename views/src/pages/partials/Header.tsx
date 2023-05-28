import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import routes from "../../config/routes";
import { GlobalContext, initialState } from "../../context/globalStateProvider";
import endpoint from "../../config/endpoint";
import axios from "axios";
import { toast } from "react-toastify";
function Header() {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const logout = async () => {
    axios({
      method: "POST",
      url: endpoint.logout,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        toast.success(res.data.message);
        if (res.status === 200) {
          localStorage.removeItem("token");
          dispatch({ type: "setUserState", payload: initialState.userState });
          navigate(routes.home, { replace: true });
        }
      })
      .catch((err) => {
        localStorage.removeItem("token");
        dispatch({ type: "setUserState", payload: initialState.userState });
        navigate(routes.home, { replace: true });
      });
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to={routes.home} className="flex">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="FlowBite Logo"
          />
          <span className="font-semibold text-xl tracking-tight">EcomSite</span>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <NavLink
            to={"/blog"}
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >
            Blog
          </NavLink>
        </div>
        {state.userState.isAuth ? (
          <>
            <div className="mr-4">
              <NavLink
                to={routes.dashboard}
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
              >
                Dashboard
              </NavLink>
            </div>

            <div>
              <NavLink
                to="#"
                onClick={logout}
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
              >
                Logout
              </NavLink>
            </div>
          </>
        ) : (
          <div>
            <NavLink
              to={routes.signin}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              SignIn
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
