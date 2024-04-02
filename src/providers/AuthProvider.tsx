import { ReactNode, createContext, useContext, useState } from "react";
import { UserCredentials } from "../types";
import { FeedbackContext } from "./FeedbackProvider";

type Props = {
  children: ReactNode;
};

type TAuthContext = {
  login: (userCredentials: UserCredentials) => void;
  isAuthorized: boolean;
  logout: VoidFunction;
};

export const AuthContext = createContext<TAuthContext>({
  login: () => {},
  isAuthorized: false,
  logout: () => {},
});

export const AuthContextProvider = ({ children }: Props) => {
  const { setIsLoading, setIsOpen, setFeedback } = useContext(FeedbackContext);
  const [isAuthorized, setIsAuthorized] = useState(
    !!localStorage.getItem("auth-data"),
  );
  const login = async (credentials: UserCredentials) => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        "auth-data",
        JSON.stringify({
          "app-id": import.meta.env.VITE_DUMMY_APY_APP_ID,
          email: credentials.email,
        }),
      );
      setIsAuthorized(true);
      setFeedback({
        message: "Autenticación Exitosa",
        status: "success",
      });
      setIsOpen(true);
      setIsLoading(false);
    }, 1500);
  };

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem("auth-data");
    setIsAuthorized(false);
    setIsLoading(false);
    setIsOpen(true);
    setFeedback({
      status: "success",
      message: "Hasta luego!",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        isAuthorized,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
