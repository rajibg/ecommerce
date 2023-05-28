import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import routes from "../../config/routes";
import endpoint from "../../config/endpoint";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const SignupSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6).max(50).required("Required"),
    confirmPassword: Yup.string()
      .required("Please retype your password.")
      .oneOf([Yup.ref("password")]),
  });

  const { handleSubmit, handleChange, values, errors, touched, isValid } =
    useFormik({
      initialValues: {
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: SignupSchema,
      onSubmit: async (values, { setErrors, resetForm }) => {
        try {
          const response = await fetch(endpoint.signup, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...values,
              ["name"]: values.fullname,
              fullname: undefined,
            }),
          });

          const result = await response.json();
          if (result.user) {
            toast.success("User created successfully.");
            resetForm();
            navigate(routes.signin, {
              state: { from: location.state || "" },
            });
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
          Sign Up
        </h3>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Fullname"
              onChange={handleChange}
              value={values.fullname}
            />
            {errors.fullname && touched.fullname && (
              <div className="error">{errors.fullname} </div>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={values.email}
            />
            {errors.email && touched.email && (
              <div className="error">{errors.email} </div>
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
              <div className="error">{errors.password} </div>
            )}
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm_password"
            >
              Confirm password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm_password"
              name="confirmPassword"
              type="password"
              placeholder="******************"
              onChange={handleChange}
              value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="error">{errors.confirmPassword} </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={!isValid}
            >
              Sign Up
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to={routes.signin}
            >
              Sign in?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Signup;
