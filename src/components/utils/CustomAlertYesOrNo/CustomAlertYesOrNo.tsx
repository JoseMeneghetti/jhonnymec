import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import { AlertTitle } from "@mui/material";
import { OpenAlert } from "../../typings/global";

const sx = {
  position: "absolute",
  width: "20%",
  height: "auto",
  transform: "translate(50%, 50%)",
  bottom: "60%",
  right: "50%",
  zIndex: 2,
};

type CustomAlertYesOrNoProps = {
  openAlert: OpenAlert;
  setOpenAlert: React.Dispatch<React.SetStateAction<OpenAlert>>;
  color: "success" | "info" | "warning" | "error" | undefined;
  severity: "success" | "info" | "warning" | "error" | undefined;
  text: string;
  title: string;
};

const CustomAlertYesOrNo: React.FC<CustomAlertYesOrNoProps> = ({
  openAlert,
  setOpenAlert,
  color,
  severity,
  text,
  title,
}) => {

  function handleCondition(condition: string) {
    setOpenAlert({ ...openAlert, condition: condition, open: false });
    // setOpenAlert({ ...openAlert, open: false });
  }

  return (
    <Box sx={sx}>
      <Collapse in={openAlert.open}>
        <Alert
          severity={severity}
          color={color}
          action={
            <>
              <Button
                color="inherit"
                size="small"
                onClick={() => handleCondition("sim")}
              >
                SIM
              </Button>
              <Button
                color="inherit"
                size="small"
                onClick={() => handleCondition("nao")}
              >
                NAO
              </Button>
            </>
          }
          sx={{ height: "auto", display: "flex", alignItems: "center" }}
        >
          <AlertTitle>{title}</AlertTitle>
          <span style={{ whiteSpace: "pre-line" }}>{text}</span>
        </Alert>
      </Collapse>
    </Box>
  );
};

export default CustomAlertYesOrNo;
