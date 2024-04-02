import { useContext } from "react";
import Button from "./Button";
import { AuthContext } from "../providers/AuthProvider";

export default function Header() {
  const { logout } = useContext(AuthContext);
  return (
    <div className="bg-slate-800 text-white h-12 flex items-center pl-3 pr-3 justify-between fixed top-0 w-full">
      <p className="font-medium text-lg">
        Modulo de Consulta y Registro de Usuarios al Sistema
      </p>
      <Button onClick={() => logout()}>Salir</Button>
    </div>
  );
}
