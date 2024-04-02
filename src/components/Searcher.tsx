import { useContext } from "react";
import { AppContext } from "../providers/AppContextProvider";

export default function Searcher() {
  const { searchUser } = useContext(AppContext);
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Buscar Usuario"
        onChange={searchUser}
        className="text-white w-[calc(100vw-180px)]  p-4 bg-slate-400 h-10 rounded-md  placeholder:text-white"
      />
    </div>
  );
}
