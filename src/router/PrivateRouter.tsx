import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { LOGIN } from "./paths";
import { AuthContext } from "../providers/AuthProvider";
import { AppContextProvider } from "../providers/AppContextProvider";

export const PrivateRouter = () => {
  const { isAuthorized } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthorized) navigate(LOGIN);
  }, [isAuthorized, navigate]);
  if (isAuthorized)
    return (
      <AppContextProvider>
        <div className="h-svh">
          <Outlet />
        </div>
      </AppContextProvider>
    );
};
