import axios, { AxiosError, AxiosResponse } from "axios";
import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types";
import { FeedbackContext } from "./FeedbackProvider";

type TAppContext = {
  users: User[];
  usersFiltered: User[];
  getUsersList: (page: number) => void;
  getUserById: (id: string) => void;
  deleteUserById: (id: string) => void;
  createUser: () => void;
  updateUser: () => void;
  handlePagination: (type: "FIRST" | "LAST" | "NEXT" | "PREV") => void;
  searchUser: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  lastPage: number;
  userSelected: User | null;
  openUserForm: boolean;
  setOpenUserForm: Dispatch<SetStateAction<boolean>>;
  setUserSelected: Dispatch<SetStateAction<User>>;
};

export const AppContext = createContext<TAppContext>({
  users: [],
  usersFiltered: [],
  getUsersList: () => {},
  createUser: () => {},
  deleteUserById: () => {},
  getUserById: () => {},
  updateUser: () => {},
  handlePagination: () => {},
  page: 0,
  lastPage: 0,
  searchUser: () => {},
  userSelected: null,
  openUserForm: false,
  setOpenUserForm: () => {},
  setUserSelected: () => {},
});

type Props = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersFiltered, setUsersFiltered] = useState<User[]>([]);
  const [openUserForm, setOpenUserForm] = useState(false);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [userSelected, setUserSelected] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const { setIsLoading, setIsOpen, setFeedback } = useContext(FeedbackContext);

  const AUTH_DATA = JSON.parse(String(localStorage.getItem("auth-data")));

  const getUsersList = useCallback(async () => {
    setIsLoading(true);
    await axios({
      baseURL: import.meta.env.VITE_DUMMY_API_URL,
      method: "get",
      url: `/user?page=${page}`,
      headers: {
        "app-id": AUTH_DATA["app-id"],
      },
    })
      .then(({ data }: AxiosResponse) => {
        const users = data.data;
        setLastPage(Math.round(data.total / 20) - 1);
        setUsers(users);
        setUsersFiltered(users);
        setFeedback({
          message: "Users Listed Succesfully :)!",
          status: "success",
        });
        setIsOpen(true);
      })
      .catch(() => {
        setFeedback({
          message: "We couldn't get users :(!",
          status: "error",
        });
        setIsOpen(true);
      })
      .finally(() => setIsLoading(false));
  }, [AUTH_DATA, setIsLoading, page, setFeedback, setIsOpen]);

  const getUserById = useCallback(
    async (id: string) => {
      setIsLoading(true);
      await axios({
        baseURL: import.meta.env.VITE_DUMMY_API_URL,
        method: "get",
        url: `/user/${id}`,
        headers: {
          "app-id": AUTH_DATA["app-id"],
        },
      })
        .then(({ data }: AxiosResponse) => {
          setUserSelected(data);
          setOpenUserForm(true);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    },
    [setIsLoading, AUTH_DATA],
  );

  const deleteUserById = useCallback(
    async (id: string) => {
      const newUsersList = users.filter((user) => user.id !== id);
      setUsersFiltered(newUsersList);
      await axios({
        baseURL: import.meta.env.VITE_DUMMY_API_URL,
        method: "delete",
        url: `/user/${id}`,
        headers: {
          "app-id": AUTH_DATA["app-id"],
        },
      })
        .then(() => {
          setFeedback({
            message: "User Deleted!",
            status: "success",
          });
          setIsOpen(true);
        })
        .catch(() => {
          setFeedback({
            message: "User couldn't be deleted :(!",
            status: "error",
          });
          setIsOpen(true);
        });
    },
    [AUTH_DATA, users, setFeedback, setIsOpen],
  );

  const updateUser = useCallback(async () => {
    if (userSelected) {
      const newUserList = users.filter((user) => user.id !== userSelected.id);
      newUserList.unshift(userSelected);
      setUsersFiltered(newUserList);
      await axios({
        baseURL: import.meta.env.VITE_DUMMY_API_URL,
        method: "put",
        url: `/user/${userSelected.id}`,
        headers: {
          "app-id": AUTH_DATA["app-id"],
        },
        data: userSelected,
      })
        .then(() => {
          setFeedback({
            message: "User updated Succesfully :)!",
            status: "success",
          });
          setIsOpen(true);
        })
        .catch(() => {
          setFeedback({
            message: "We couldn't update the User :(!",
            status: "error",
          });
          setIsOpen(true);
        });
    }
  }, [AUTH_DATA, users, userSelected, setFeedback, setIsOpen]);

  const createUser = useCallback(async () => {
    setIsLoading(true);
    await axios({
      baseURL: import.meta.env.VITE_DUMMY_API_URL,
      method: "post",
      url: "/user/create",
      headers: {
        "app-id": AUTH_DATA["app-id"],
      },
      data: userSelected,
    })
      .then(({ data }: AxiosResponse) => {
        setUserSelected({
          ...userSelected,
          id: data["id"],
        });
        setUsersFiltered([{ ...userSelected, id: data["id"] }, ...users]);
        setFeedback({
          message: "User Created!",
          status: "success",
        });
        setIsOpen(true);
      })
      .catch(() => {
        setFeedback({
          message:
            "We couldn't create user :(, please check the values, maybe the user exist!",
          status: "error",
        });
        setIsOpen(true);
      })
      .finally(() => setIsLoading(false));
  }, [AUTH_DATA, users, userSelected, setIsLoading, setFeedback, setIsOpen]);

  const handlePagination = useCallback(
    (type: "FIRST" | "LAST" | "NEXT" | "PREV") => {
      switch (type) {
        case "FIRST":
          setPage(0);
          break;
        case "LAST":
          setPage(lastPage);
          break;
        case "NEXT":
          setPage(page + 1);
          break;
        case "PREV":
          if (page > 0) setPage(page - 1);
          break;
        default:
          break;
      }
    },
    [page, lastPage],
  );

  const searchUser = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      const newUsersList = users.filter((user) =>
        String(user.firstName).includes(value),
      );
      setUsersFiltered(newUsersList);
    },
    [users],
  );

  useEffect(() => {
    getUsersList();
    // eslint-disable-next-line
  }, [page]);

  return (
    <AppContext.Provider
      value={{
        users,
        userSelected,
        setUserSelected,
        getUsersList,
        getUserById,
        updateUser,
        createUser,
        deleteUserById,
        handlePagination,
        page,
        lastPage,
        searchUser,
        usersFiltered,
        openUserForm,
        setOpenUserForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
