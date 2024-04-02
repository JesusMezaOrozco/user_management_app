import { useContext, useState } from "react";
import { Title, User } from "../types";
import { AppContext } from "../providers/AppContextProvider";
import { MdOutlineDelete, MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import IconButton from "./IconButton";
import { Tooltip } from "@mui/material";
import { getTitle } from "../utils";

type Props = {
  user: User;
};

export default function Card({ user }: Props) {
  const { deleteUserById, getUserById } = useContext(AppContext);
  const [save, setSave] = useState(false);
  return (
    <div
      className="min-w-44 h-28 flex items-center gap-3 bg-slate-500 p-4 rounded-md text-white"
      style={{
        border: save ? "1px solid red" : "none",
      }}
    >
      <img src={user.picture} alt={user.firstName} className="rounded-full" />
      <div className="min-w-40">
        <p className="flex flex-wrap gap-1 w-32">
          <span className="font-medium">
            {getTitle(user["title"] as Title)}.
          </span>
          <span>{user.firstName}</span>
          <span>{user.lastName}</span>
        </p>
      </div>
      <IconButton onClick={() => getUserById(String(user.id))}>
        <MdModeEdit />
      </IconButton>
      <div className="flex flex-col gap-1">
        <div className="flex">
          {!save && (
            <IconButton onClick={() => setSave(!save)}>
              <MdOutlineDelete />
            </IconButton>
          )}
          {save && (
            <Tooltip title="Confirm Deletion">
              <IconButton onClick={() => deleteUserById(String(user.id))}>
                <FaSave />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}
