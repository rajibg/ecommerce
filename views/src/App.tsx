import { useEffect, useContext } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/layouts/Layout";
import Blog from "./pages/Blog";
import Signin from "./pages/Auth/signin";
import Signup from "./pages/Auth/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContext } from "./context/globalStateProvider";
import routes from "./config/routes";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import endpoint from "./config/endpoint";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const { state, dispatch } = useContext(GlobalContext);
  const token = localStorage.hasOwnProperty("token")
    ? localStorage.getItem("token")
    : null;

  if (token) {
    axios.interceptors.request.use((req) => {
      req.headers["Authorization"] = "Basic " + token;
      return req;
    });
  }

  const queryClient = new QueryClient();

  useEffect(() => {
    if (token && !state.userState.isAuth) {
      axios({
        url: endpoint.authCheck,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.data.user) {
          dispatch({
            type: "setUserState",
            payload: {
              id: res.data.user._id,
              name: res.data.user.name,
              isAuth: true,
            },
          });
        }
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.blog} element={<Blog />} />
            <Route
              path={routes.signin}
              element={
                <GuestRoute>
                  <Signin />
                </GuestRoute>
              }
            />
            <Route
              path={routes.signup}
              element={
                <GuestRoute>
                  <Signup />
                </GuestRoute>
              }
            />
          </Route>
        </Routes>
        <ToastContainer position="bottom-right" autoClose={3000} closeOnClick />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
