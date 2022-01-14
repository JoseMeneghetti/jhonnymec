import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Divider, TextField } from "@mui/material";
import { useEffect } from "react";
import { writeUserData } from "../../firebase/realTimeFunctions";
import { createStyles, makeStyles } from "@material-ui/styles";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import { Nota } from "../typings/global";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    divStyle: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    inputs: {
      marginBottom: "10px",
      marginTop: "10px",
    },
    divButtons: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

const style = {
  width: "70%",
  heigth: "auto",
  margin: "auto",
};

type FormularioProps = {
  nota: Nota;
  setNota: React.Dispatch<React.SetStateAction<any>>;
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
  id: "",
  marca: "",
  modelo: "",
  ano: "",
};

const Formulario: React.FC<FormularioProps> = ({ nota, setNota }) => {
  const modalClientContext: any = useContext(DataContext);

  const classes = useStyles();

  useEffect(() => {
    if (modalClientContext?.selectedRow) {
      setNota(modalClientContext?.selectedRow);
    } else setNota(DEFAULT_CLIENT);
  }, [modalClientContext]);

  return (
    <div>
      <Box component="form" sx={style as any} noValidate autoComplete="off">
        <Typography id="modal-modal-title" variant="h4" component="h4">
          Nota de Servico
        </Typography>
        <Divider />
        <div className={`${classes.container}`}>
          <div className={`${classes.divStyle}`}>
            <TextField
              className={`${classes.inputs}`}
              required
              fullWidth
              id="outlined-required"
              label="Nome"
              value={nota.nome}
              onChange={(event) => {
                setNota({ ...nota, nome: event.target.value });
              }}
            />
            <TextField
              className={`${classes.inputs}`}
              required
              id="outlined-required"
              type="number"
              label="CPF/CNPJ"
              value={nota.documento}
              onChange={(event) => {
                setNota({
                  ...nota,
                  documento: event.target.value,
                  id: event.target.value,
                });
              }}
            />
            <TextField
              className={`${classes.inputs}`}
              required
              id="outlined-required"
              type="email"
              label="E-mail"
              value={nota.email}
              onChange={(event) => {
                setNota({ ...nota, email: event.target.value });
              }}
            />
            <TextField
              className={`${classes.inputs}`}
              required
              id="outlined-required"
              label="Telefone"
              type="tel"
              value={nota.telefone}
              onChange={(event) => {
                setNota({ ...nota, telefone: event.target.value });
              }}
            />
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h6">
            Cadastro de Endereco
          </Typography>
          <Divider />
          <div className={`${classes.divStyle}`}>
            <TextField
              className={`${classes.inputs}`}
              required
              id="outlined-required"
              label="CEP"
              value={nota.cep}
              onChange={(event) => {
                setNota({ ...nota, cep: event.target.value });
              }}
            />
            <TextField
              className={`${classes.inputs}`}
              required
              id="outlined-required"
              label="Rua"
              value={nota.logradouro}
              onChange={(event) => {
                setNota({ ...nota, logradouro: event.target.value });
              }}
            />

            <TextField
              className={`${classes.inputs}`}
              required
              id="outlined-required"
              label="Numero"
              type="number"
              value={nota.numero}
              onChange={(event) => {
                setNota({ ...nota, numero: event.target.value });
              }}
            />

            <TextField
              className={`${classes.inputs}`}
              required
              id="outlined-required"
              label="Bairro"
              value={nota.bairro}
              onChange={(event) => {
                setNota({ ...nota, bairro: event.target.value });
              }}
            />
            <TextField
              className={`${classes.inputs}`}
              required
              id="outlined-required"
              label="Cidade"
              value={nota.cidade}
              onChange={(event) => {
                setNota({ ...nota, cidade: event.target.value });
              }}
            />
            <TextField
              className={`${classes.inputs}`}
              required
              id="outlined-required"
              label="Estado"
              value={nota.uf}
              onChange={(event) => {
                setNota({ ...nota, uf: event.target.value });
              }}
            />
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h6">
            Especificações do Carro
          </Typography>
          <Divider />

          <div className={`${classes.divStyle}`}>
            <TextField
              className={`${classes.inputs}`}
              required
              id="outlined-required"
              label="Marca"
              value={nota.marca}
              onChange={(event) => {
                setNota({ ...nota, marca: event.target.value });
              }}
            />
            <TextField
              className={`${classes.inputs}`}
              required
              id="outlined-required"
              label="Modelo"
              value={nota.modelo}
              onChange={(event) => {
                setNota({ ...nota, modelo: event.target.value });
              }}
            />
            <TextField
              className={`${classes.inputs}`}
              required
              id="outlined-required"
              label="Ano"
              value={nota.ano}
              onChange={(event) => {
                setNota({ ...nota, ano: event.target.value });
              }}
            />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Formulario;
