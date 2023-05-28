const apiPoint =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:3000"
    : "http://127.0.0.1:3000";

export default {
  signup: `${apiPoint}/api/auth/registration`,
  signin: `${apiPoint}/api/auth/login`,
  authCheck: `${apiPoint}/api/auth/auth-check`,
  logout: `${apiPoint}/api/auth/logout`,
  bloglist: `https://fakerapi.it/api/v1/books`,
};
