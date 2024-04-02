import { ChangeEvent, useCallback, useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { UserCredentials } from "../types";
import Button from "../components/Button";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [loginData, setLoginData] = useState<UserCredentials>({
    password: "",
    email: "",
  });
  const handleLoginCredentials = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setLoginData({ ...loginData, [name]: value });
    },
    [loginData],
  );
  const handleLogin = useCallback(() => {
    login({
      email: loginData.email,
      password: loginData.password,
    });
  }, [loginData, login]);
  return (
    <div className="flex h-svh justify-center items-center">
      <div className="w-[300px] h-[350px] bg-gray-700 p-6 rounded-md">
        <div className="flex justify-center">
          <img
            src="/logo.png"
            className="rounded-full"
            width={100}
            height={100}
            alt=""
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="text-white"
        >
          <label htmlFor="login-email">Email</label>
          <br />
          <input
            id="login-email"
            name="email"
            type="email"
            onChange={handleLoginCredentials}
            className="text-white  p-4 bg-slate-400 h-10 rounded-md  placeholder:text-white w-full"
          />
          <br />
          <label htmlFor="login-password">Password</label>
          <br />
          <input
            id="login-password"
            name="password"
            type="password"
            onChange={handleLoginCredentials}
            className="text-white  p-4 bg-slate-400 h-10 rounded-md  placeholder:text-white w-full"
          />
          <div className="flex justify-center mt-4">
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
