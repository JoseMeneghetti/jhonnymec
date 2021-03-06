import * as React from "react";
import { useEffect, useContext } from "react";
import { firebaseGetDocsNotas } from "../../firebase/realTimeFunctions";
import { DataGrid, GridColumns, GridRenderCellParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import PreviewIcon from "@mui/icons-material/Preview";
import { Skeleton, Stack } from "@mui/material";
import { DataContext } from "../context/DataContext";
import { StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { MyDocument } from "./modelo/Document";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerWidth: {
      height: 400,
      width: "60%",
      margin: "auto",
      [theme.breakpoints.down(1400)]: {
        width: "100%",
      },
    },
  })
);

export default function ViewNota() {
  const modalClientContext: any = useContext(DataContext);
  const classes = useStyles();

  const [tableNota, setTableNota] = React.useState<any>(undefined);
  const [selectedRowNota, setSelectedRowNota] = React.useState<any>(undefined);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleClickView(rowData: any) {
    setSelectedRowNota(rowData);
    handleOpen();
  }

  function renderRating(params: GridRenderCellParams) {
    return (
      <div>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => handleClickView(params.row)}
        >
          <PreviewIcon color="action" />
        </IconButton>
      </div>
    );
  }

  const columns: GridColumns = [
    { field: "id", headerName: "N?? da Nota", width: 150 },
    { field: "nome", headerName: "Cliente", width: 250 },
    { field: "data", headerName: "Data", width: 130 },
    { field: "modelo", headerName: "Carro", width: 200 },
    {
      field: "actions",
      headerName: "Ver Nota",
      renderCell: (params: GridRenderCellParams<any>) => renderRating(params),
      width: 100,
    },
  ];

  useEffect(() => {
    firebaseGetDocsNotas(setTableNota);
  }, [modalClientContext.open]);

  return (
    <div className={classes.drawerWidth}>
      {tableNota ? (
        <DataGrid
          rows={Object.values(tableNota)}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          density="comfortable"
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
        <Box sx={sx}>
          <PDFViewer style={styles.viewer}>
            {MyDocument(selectedRowNota)}
          </PDFViewer>
        </Box>
      </Modal>
    </div>
  );
}
