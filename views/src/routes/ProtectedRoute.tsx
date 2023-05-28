import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/globalStateProvider";
import routes from "../config/routes";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { state } = useContext(GlobalContext);
  const loation = useLocation();
  if (!state.userState.isAuth) {
    return <Navigate to={routes.signin} state={loation.pathname} replace />;
  }
  return children;
}

export default ProtectedRoute;
