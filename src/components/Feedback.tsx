import { useContext } from "react";
import { Alert, AlertProps, Snackbar } from "@mui/material";
import { FeedbackContext } from "../providers/FeedbackProvider";

export default function Feedback() {
  const { feedback, isOpen, setIsOpen } = useContext(FeedbackContext);
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={2000}
      onClose={() => setIsOpen(false)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={() => setIsOpen(false)}
        severity={feedback.status as AlertProps["severity"]}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {feedback.message}
      </Alert>
    </Snackbar>
  );
}
