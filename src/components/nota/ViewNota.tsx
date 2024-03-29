import * as React from "react";
import { useEffect, useContext } from "react";
import {
  firebaseGetDocsNotas,
  writeUserDataNota,
} from "../../firebase/realTimeFunctions";
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import PreviewIcon from "@mui/icons-material/Preview";
import { Skeleton, Stack } from "@mui/material";
import { DataContext } from "../context/DataContext";
import { StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { MyDocument } from "./modelo/Document";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import CustomAlert from "../utils/CustomAlert/CustomAlert";
import CustomAlertYesOrNo from "../utils/CustomAlertYesOrNo/CustomAlertYesOrNo";
import { OpenAlert } from "../typings/global";

const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    height: "700px",
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerWidth: {
      height: 500,
      width: "60%",
      margin: "auto",
      overflow: "auto",
      maxHeight: "-webkit-fill-available",
      [theme.breakpoints.down(1400)]: {
        width: "100%",
      },
    },
    sx: {
      display: "flex",
      alignItems: "flex-end",
      flexDirection: "column",
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
  })
);

export default function ViewNota() {
  const modalClientContext: any = useContext(DataContext);
  const classes = useStyles();

  const DEFAULT_ALERT = {
    open: false,
    condition: "nao",
  };

  const [tableNota, setTableNota] = React.useState<any>(undefined);
  const [selectedRowNota, setSelectedRowNota] = React.useState<any>(undefined);
  const [openCancelAlert, setOpenCancelAlert] = React.useState(false);
  const [cancelRow, setCancelRow] = React.useState<any>();
  const [openYesOrNoCancelAlert, setOpenYesOrNoCancelAlert] =
    React.useState<OpenAlert>(DEFAULT_ALERT);
  const [nomeNota, setNomeNota] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleClickView(rowData: any) {
    setSelectedRowNota(rowData);
    handleOpen();
  }

  function handleCancelNota(rowData: any) {
    const data = rowData;
    setCancelRow(data);
    setNomeNota(`Numero: ${data.id} \n Nome: ${data.nome}`);
    setOpenYesOrNoCancelAlert({ ...openYesOrNoCancelAlert, open: true });
  }

  useEffect(() => {
    if (openYesOrNoCancelAlert?.condition === "sim") {
      writeUserDataNota(cancelRow, _, true);
      setOpenYesOrNoCancelAlert({
        ...openYesOrNoCancelAlert,
        condition: "nao",
        open: false,
      });
      setCancelRow(undefined);
      setOpenCancelAlert(true);
    }
  }, [openYesOrNoCancelAlert.condition]);

  function renderRating(params: GridRenderCellParams) {
    return (
      <>
        <div>
          <IconButton
            color="primary"
            aria-label="view nota"
            component="span"
            onClick={() => handleClickView(params.row)}
          >
            <PreviewIcon color="action" />
          </IconButton>
        </div>
        <div>
          <IconButton
            color="primary"
            aria-label="cancel nota"
            component="span"
            onClick={() => handleCancelNota(params.row)}
          >
            <CancelIcon color="error" />
          </IconButton>
        </div>
      </>
    );
  }

  const columns: GridColumns = [
    { field: "id", headerName: "Nº", width: 50 },
    { field: "nome", headerName: "Cliente", width: 250 },
    { field: "data", headerName: "Data", width: 130 },
    {
      field: "carro",
      headerName: "carro",
      valueGetter: (params: GridValueGetterParams<any>) => {
        return `${params?.row?.marca} ${params?.row?.modelo} - ${params?.row?.ano}`;
      },
      width: 250,
    },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "actions",
      headerName: "Ver Nota / CANCELAR",
      renderCell: (params: GridRenderCellParams<any>) => renderRating(params),
      width: 200,
    },
  ];

  useEffect(() => {
    firebaseGetDocsNotas(setTableNota);
  }, [modalClientContext.open]);
  return (
    <div className={classes.drawerWidth}>
      {openYesOrNoCancelAlert && (
        <CustomAlertYesOrNo
          severity={"warning"}
          color={"warning"}
          setOpenAlert={setOpenYesOrNoCancelAlert}
          openAlert={openYesOrNoCancelAlert}
          text={`Voce tem certeza que quer Cancelar essa nota? \n ${nomeNota}`}
          title={"Atencao!"}
        />
      )}
      {openCancelAlert && (
        <CustomAlert
          severity={"success"}
          color={"success"}
          setOpenAlert={setOpenCancelAlert}
          openAlert={openCancelAlert}
          text={"Nota Cancelada com Sucesso!"}
          title={"Sucesso!"}
        />
      )}
      {tableNota ? (
        <DataGrid
          rows={Object.values(tableNota)}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          density="comfortable"
          initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'desc' }],
            },
          }}
        />
      ) : (
        <Stack spacing={1}>
          <Skeleton variant="text" />
          <Skeleton variant="rectangular" width={800} height={400} />
        </Stack>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.sx}>
          <IconButton
            color="default"
            aria-label="close"
            component="span"
            onClick={() => handleClose()}
          >
            <CancelIcon />
          </IconButton>
          <PDFViewer style={styles.viewer}>
            {MyDocument(selectedRowNota)}
          </PDFViewer>
        </Box>
      </Modal>
    </div>
  );
}
function _(cancelRow: any, _: any, arg2: boolean) {
  throw new Error("Function not implemented.");
}
