import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import routes from "../../config/routes";
import { useFormik } from "formik";
import * as Yup from "yup";
import endpoint from "../../config/endpoint";
import { toast } from "react-toastify";
import { GlobalContext } from "../../context/globalStateProvider";

function Signin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { _, dispatch } = useContext(GlobalContext);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required").trim(),
    password: Yup.string().min(6).max(50).required("Required").trim(),
  });

  const { handleSubmit, handleChange, values, errors, touched, isValid } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: SignupSchema,
      onSubmit: async (values, { setErrors, resetForm }) => {
        try {
          const response = await fetch(endpoint.signin, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          const result = await response.json();
          if (result.user) {
            dispatch({
              type: "setUserState",
              payload: {
                id: result.user._id,
                name: result.user.name,
                isAuth: true,
              },
            });
            localStorage.setItem("token", result.token);
            toast.success("Loggedin successfully.");
            navigate(location.state || routes.home);
          }

          if (result.error) {
            setErrors(result.error);
          }
        } catch (ex) {
          if (ex instanceof Error) {
            console.log("error", ex);
            toast.error(ex.message);
          }
        }
      },
    });

  return (
    <section className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center justify-center">
      <div className="w-full max-w-md justify-center">
        <h3 className="mb-4 text-2xl font-bold leading-none tracking-tight text-center">
          Sign In
        </h3>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={values.email}
            />
            {errors.email && touched.email && (
              <div className="error">{errors.email}</div>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="******************"
              onChange={handleChange}
              value={values.password}
            />
            {errors.password && touched.password && (
              <div className="error">{errors.password}</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={!isValid}
            >
              Sign In
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to={routes.signup}
            >
              Sign up?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Signin;
