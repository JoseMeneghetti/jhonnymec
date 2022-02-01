import * as React from "react";
import AddClient from "./AddClient";
import { useEffect, useContext } from "react";
import { firebaseGetDocsClient } from "../../firebase/realTimeFunctions";
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PreviewIcon from "@mui/icons-material/Preview";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { Skeleton, Stack } from "@mui/material";
import { DataContext } from "../context/DataContext";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerWidth: {
      height: 500,
      width: "60%",
      margin: "auto",
      [theme.breakpoints.down(1400)]: {
        width: "100%",
      },
    },
  })
);

export default function Clientes() {
  const modalClientContext: any = useContext(DataContext);
  const classes = useStyles();

  const [tableClient, setTableClient] = React.useState<any>(undefined);

  function handleClickView(rowData: any) {
    modalClientContext.setSelectedRow(rowData);
    modalClientContext.setOpen(true);
  }
  function handleClickWhatsApp(telefone: number) {
    window.open(`https://wa.me/55${telefone}`);
  }
  function handleClickNota(rowData: any) {
    modalClientContext.setSelectedRow(rowData);
    modalClientContext.setMenuName([1, "Nota"]);
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
        {params?.row?.telefone ? (
          <IconButton
            color="success"
            aria-label="upload picture"
            component="span"
            onClick={() => handleClickWhatsApp(params?.row?.telefone)}
          >
            <WhatsAppIcon color="success" />
          </IconButton>
        ) : (
          <></>
        )}
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => handleClickNota(params.row)}
        >
          <LocalAtmIcon color="secondary" />
        </IconButton>
      </div>
    );
  }

  const columns: GridColumns = [
    { field: "nome", headerName: "Nome", width: 250 },
    { field: "telefone", headerName: "Telefone", width: 130 },
    {
      field: "carro",
      headerName: "carro",
      valueGetter: (params: GridValueGetterParams<any>) => {
        return `${params?.row?.carros[0]?.marca} ${params?.row?.carros[0]?.modelo} - ${params?.row?.carros[0]?.ano}`;
      },
      width: 250,
    },
    {
      field: "actions",
      headerName: "Ver/WhatsApp/Nota",
      renderCell: (params: GridRenderCellParams<any>) => renderRating(params),
      width: 180,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      firebaseGetDocsClient(setTableClient);
    }, 1500);
  }, [modalClientContext.open]);

  return (
    <div className={classes.drawerWidth}>
      {tableClient ? (
        <DataGrid
          rows={Object.values(tableClient)}
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
      <AddClient />
    </div>
  );
}
