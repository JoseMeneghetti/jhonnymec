import * as React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ModalClient from "./ModalClient";
import { ModalClientContext } from "./context/modalContext";
import { useContext } from "react";

const AddClient: React.FC = () => {
  const modalClientContext: any = useContext(ModalClientContext);

  const handleOpen = () => modalClientContext.setOpen(true);

  return (
    <div>
      <Fab
        onClick={() => {
          modalClientContext.setSelectedRow(undefined)
          handleOpen()
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
