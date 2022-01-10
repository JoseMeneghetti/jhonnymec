import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Divider, TextField, Toolbar } from "@mui/material";
import { useEffect } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexWrap: "wrap",
};
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
};

export default function AddClient() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [client, setClient] = React.useState(DEFAULT_CLIENT);

  useEffect(() => {
    if (client.cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${client.cep}/json/`)
        .then((response) => response.json())
        .then((data) =>
          setClient({
            ...client,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf,
          })
        );
    }
  }, [client.cep]);

  console.log(client);

  return (
    <div>
      <Fab onClick={handleOpen} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} noValidate autoComplete="off">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cadastro de Cliente
          </Typography>
          <Divider />
          <div>
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Nome"
              value={client.nome}
              onChange={(event) => {
                setClient({ ...client, nome: event.target.value });
              }}
            />
            <TextField
              required
              id="outlined-required"
              type="number"
              label="CPF/CNPJ"
              value={client.documento}
              onChange={(event) => {
                setClient({ ...client, documento: event.target.value });
              }}
            />
            <TextField
              required
              id="outlined-required"
              type="email"
              label="E-mail"
              value={client.email}
              onChange={(event) => {
                setClient({ ...client, email: event.target.value });
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Telefone"
              type="tel"
              value={client.telefone}
              onChange={(event) => {
                setClient({ ...client, telefone: event.target.value });
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="CEP"
              value={client.cep}
              onChange={(event) => {
                setClient({ ...client, cep: event.target.value });
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Rua"
              value={client.logradouro}
              onChange={(event) => {
                setClient({ ...client, logradouro: event.target.value });
              }}
            />
            
            <TextField
              required
              id="outlined-required"
              label="Numero"
              type="number"
              value={client.numero}
              onChange={(event) => {
                setClient({ ...client, numero: event.target.value });
              }}
            />

            <TextField
              required
              id="outlined-required"
              label="Bairro"
              value={client.bairro}
              onChange={(event) => {
                setClient({ ...client, bairro: event.target.value });
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Cidade"
              value={client.cidade}
              onChange={(event) => {
                setClient({ ...client, cidade: event.target.value });
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Estado"
              value={client.uf}
              onChange={(event) => {
                setClient({ ...client, uf: event.target.value });
              }}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
