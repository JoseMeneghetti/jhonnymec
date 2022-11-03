import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { AlertTitle } from "@mui/material";

const sx = {
  position: "absolute",
  width: "350px",
  height: "auto",
  transform: "translate(50%, 50%)",
  right: "50%",
  bottom: "60%",
  zIndex: 2,
};

type CustomAlertProps = {
  openAlert: boolean;
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  color: "success" | "info" | "warning" | "error" | undefined;
  severity: "success" | "info" | "warning" | "error" | undefined;
  text: string;
  title: string;
};

const CustomAlert: React.FC<CustomAlertProps> = ({
  openAlert,
  setOpenAlert,
  color,
  severity,
  text,
  title,
}) => {
  React.useEffect(() => {
    if (openAlert) {
      setTimeout(() => {
        setOpenAlert(false);
      }, 5000);
    }
  }, [openAlert]);

  return (
    <Box sx={sx}>
      <Collapse in={openAlert}>
        <Alert
          severity={severity}
          color={color}
          action={
            <IconButton
              aria-label="close"
              color={color}
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ height: 'auto', display: "flex", alignItems: "center" }}
        >
          <AlertTitle>{title}</AlertTitle>
          {text}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default CustomAlert;
