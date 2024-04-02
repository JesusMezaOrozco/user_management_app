import { useContext } from "react";
import { AppContext } from "../providers/AppContextProvider";
import Button from "./Button";

export default function Paginator() {
  const { handlePagination, page, lastPage } = useContext(AppContext);
  return (
    <div className="flex gap-3 justify-center absolute bottom-20">
      <Button
        onClick={() => handlePagination("FIRST")}
        disabled={page === 0}
      >{`<<`}</Button>
      <Button onClick={() => handlePagination("PREV")} disabled={page === 0}>
        {`<`}
      </Button>
      <Button
        onClick={() => handlePagination("NEXT")}
        disabled={page === lastPage}
      >
        {`>`}
      </Button>
      <Button
        onClick={() => handlePagination("LAST")}
        disabled={page === lastPage}
      >{`>>`}</Button>
    </div>
  );
}
