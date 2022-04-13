import * as React from "react";
import { StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { MyDocument } from "./modelo/Document";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Formulario from "./Formulario";
import { writeUserDataNota } from "../../firebase/realTimeFunctions";
import CheckIcon from "@mui/icons-material/Check";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import CustomAlert from "../utils/CustomAlert/CustomAlert";

const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    height: "700px",
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerWidth: {
      height: 400,
      width: "60%",
      margin: "auto",
      overflow: "auto",
      maxHeight: "-webkit-fill-available",
      [theme.breakpoints.down(1400)]: {
        width: "100%",
      },
    },
    sx: {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "70%",
      backgroundColor: "white",
      border: "2px solid #000",
      overflow: "auto",
      maxHeight: "-webkit-fill-available",
      [theme.breakpoints.down(1400)]: {
        width: "100%",
      },
    },
    formContainer: {
      width: "50%",
      heigth: "auto",
      margin: "auto",
      boxShadow:
        "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
      padding: "30px",
      borderRadius: "10px",
      [theme.breakpoints.down(1400)]: {
        width: "100%",
      },
    },
  })
);

const DEFAULT_NOTA = {
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
  clientId: "",
  data: "",
  marca: "",
  modelo: "",
  ano: "",
  km: "",
  carros: [],
  detalhes: "",
  valorServico: "",
  valorProduto: "",
  valorTotal: "",
  servicosPrestados: "",
};

const Nota: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nota, setNota] = React.useState(DEFAULT_NOTA);
  const classes = useStyles();
  const [openAlertFail, setOpenAlertFail] = React.useState(false);

  return (
    <Box component="form" autoComplete="off" className={classes.formContainer}>
      <Formulario nota={nota} setNota={setNota} DEFAULT_NOTA={DEFAULT_NOTA} />
      <Button
        onClick={() => {
          if (!nota.valorTotal || !nota.modelo) {
            setOpenAlertFail(true);
          } else {
            writeUserDataNota(nota, setNota);
            handleOpen();
          }
        }}
        variant="contained"
        color="success"
        endIcon={<CheckIcon />}
      >
        REGISTRAR NOTA
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.sx}>
          <PDFViewer style={styles.viewer}>{MyDocument(nota)}</PDFViewer>
        </Box>
      </Modal>
      {openAlertFail && (
        <CustomAlert
          severity={"error"}
          color={"error"}
          setOpenAlert={setOpenAlertFail}
          openAlert={openAlertFail}
          text={"Prencha todos os campos!"}
          title={"Falha!"}
        />
      )}
    </Box>
  );
};

export default Nota;
