import { useContext } from "react";
import { AppContext } from "../providers/AppContextProvider";
import Card from "../components/Card";
import Paginator from "../components/Paginator";
import Searcher from "../components/Searcher";
import Form from "../components/Form";
import Header from "../components/Header";
import Button from "../components/Button";

export default function Home() {
  const { usersFiltered, openUserForm, setOpenUserForm, setUserSelected } =
    useContext(AppContext);
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-4 items-center justify-center bg-slate-900 overflow-auto pt-[60px]">
        <div className="flex flex-col items-center justify-between md:flex-row gap-2">
          <Searcher />
          <Button
            onClick={() => {
              setUserSelected({
                firstName: "",
                lastName: "",
                email: "",
              });
              setOpenUserForm(true);
            }}
          >
            Crear Usuario
          </Button>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {usersFiltered.map((user) => {
            return <Card key={user.id} user={user} />;
          })}
        </div>
        <Paginator />
      </div>
      {openUserForm && <Form />}
    </div>
  );
}
