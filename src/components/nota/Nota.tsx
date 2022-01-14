import * as React from "react";
import { StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { MyDocument } from "./modelo/Document";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Formulario from "./Formulario";

const sx = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    height: "700px",
  },
});

const DEFAULT_CLIENT = {
  nome: "",
  documento: "",
  email: "",
  telefone: "",
  cep: "",
  logradouro: "",
  numero: "",
  bairro: "",
  cidade: "",
  uf: "",
  id: "",
  marca: "",
  modelo: "",
  ano: "",
};

const Nota: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nota, setNota] = React.useState(DEFAULT_CLIENT);

  return (
    <div>
      <Formulario nota={nota} setNota={setNota}/>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={sx}>
          <PDFViewer style={styles.viewer}>{MyDocument(nota)}</PDFViewer>
        </Box>
      </Modal>
    </div>
  );
};

export default Nota;
