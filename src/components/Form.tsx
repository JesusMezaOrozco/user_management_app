import { ChangeEvent, useCallback, useContext } from "react";
import { AppContext } from "../providers/AppContextProvider";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Box } from "@mui/material";
import Button from "./Button";
import IconButton from "./IconButton";
import { MdClose } from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Form() {
  const {
    userSelected,
    setUserSelected,
    updateUser,
    setOpenUserForm,
    openUserForm,
    createUser,
  } = useContext(AppContext);
  const handleClose = () => setOpenUserForm(false);
  const handleUserData = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setUserSelected({
        ...userSelected,
        [name]: value,
      });
    },
    [userSelected, setUserSelected],
  );
  return (
    <Modal
      open={openUserForm}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openUserForm}>
        <Box sx={style}>
          <div className="flex justify-end">
            <IconButton
              onClick={() => setOpenUserForm(false)}
              className="fixed bottom-0"
            >
              <MdClose />
            </IconButton>
          </div>
          <label htmlFor="user-email">Email</label>
          <input
            type="email"
            id="user-email"
            value={userSelected?.email}
            name="email"
            onChange={handleUserData}
            className="text-white  p-4 bg-slate-400 h-10 rounded-md  placeholder:text-white w-full"
            disabled={Boolean(userSelected?.id)}
          />
          <label htmlFor="user-firstname">First Name</label>
          <input
            type="text"
            id="user-firstname"
            value={userSelected?.firstName}
            name="firstName"
            onChange={handleUserData}
            className="text-white  p-4 bg-slate-400 h-10 rounded-md  placeholder:text-white w-full"
          />
          <label htmlFor="user-lastname">Last Name</label>
          <input
            type="text"
            id="user-lastname"
            value={userSelected?.lastName}
            name="lastName"
            onChange={handleUserData}
            className="text-white  p-4 bg-slate-400 h-10 rounded-md  placeholder:text-white w-full"
          />
          <div className="flex justify-center mt-6">
            {userSelected?.id && (
              <Button onClick={() => updateUser()}>Save</Button>
            )}
            {!userSelected?.id && (
              <Button onClick={() => createUser()}>Create</Button>
            )}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
