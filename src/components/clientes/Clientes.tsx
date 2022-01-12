import * as React from "react";
import AddClient from "./AddClient";
import { useEffect, useContext } from "react";
import { firebaseGetDocs } from "../../firebase/realTimeFunctions";
import { DataGrid, GridColumns, GridRenderCellParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PreviewIcon from "@mui/icons-material/Preview";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { Skeleton, Stack } from "@mui/material";
import { ModalClientContext } from "./context/modalContext";

export default function Clientes() {
  const modalClientContext: any = useContext(ModalClientContext);

  const [tableClient, setTableClient] = React.useState<any>(undefined);

  function handleClickView(rowData: any) {
    modalClientContext.setSelectedRow(rowData);
    modalClientContext.setOpen(true);
  }
  function handleClickWhatsApp(telefone: number) {
    window.open(`https://wa.me/55${telefone}`);
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
      field: "actions",
      headerName: "Ver/WhatsApp/Nota",
      renderCell: (params: GridRenderCellParams<any>) => renderRating(params),
      width: 180,
    },
  ];

  useEffect(() => {
    firebaseGetDocs(setTableClient);
  }, [modalClientContext.open]);

  return (
    <div style={{ height: 400, width: "50%", margin: "auto" }}>
      {tableClient ? (
        <DataGrid
          rows={Object.values(tableClient)}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
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
