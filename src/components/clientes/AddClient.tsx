import * as React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ModalClient from "./ModalClient";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import { createStyles, makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    addButton: {},
  })
);

const AddClient: React.FC = () => {
  const modalClientContext: any = useContext(DataContext);
  const classes = useStyles();
  const handleOpen = () => modalClientContext.setOpen(true);

  return (
    <div>
      <Fab
        className={classes.addButton}
        onClick={() => {
          modalClientContext.setSelectedRow(undefined);
          handleOpen();
        }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <ModalClient />
    </div>
  );
};
export default AddClient;
