import { useContext } from "react";
import { HOME } from "./paths";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../providers/AuthProvider";

export const PublicRouter = () => {
  const { isAuthorized } = useContext(AuthContext);
  if (isAuthorized) {
    return <Navigate to={HOME} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};
