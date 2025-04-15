import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

export default function MessageSnackbar({ messageType, message, handleClose }) {
  return (
    <div>
      <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={messageType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
