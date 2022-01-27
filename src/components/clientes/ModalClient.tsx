import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Divider, TextField } from "@mui/material";
import { useEffect } from "react";
import { writeUserDataClient } from "../../firebase/realTimeFunctions";
import { createStyles, makeStyles } from "@material-ui/styles";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import InputMask from "react-input-mask";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

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
      marginBottom: "10px!important",
      marginTop: "10px!important",
    },
    divButtons: {
      display: "flex",
      justifyContent: "center",
    },
    divCpf: {
      display: `flex`,
      flexDirection: `column`,
      alignItems: `center`,
    },
  })
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
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
  id: "",
  marca: "",
  modelo: "",
  ano: "",
  data: "",
};

const ModalClient: React.FC = () => {
  const modalClientContext: any = useContext(DataContext);

  const classes = useStyles();
  const handleClose = () => modalClientContext.setOpen(false);
  const [client, setClient] = React.useState(DEFAULT_CLIENT);
  const [cpfCpnj, setCpfCpnj] = React.useState("cpf");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpfCpnj((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (!modalClientContext?.selectedRow && client.cep.length === 8) {
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

  useEffect(() => {
    if (modalClientContext?.selectedRow) {
      setClient(modalClientContext?.selectedRow);
    } else setClient(DEFAULT_CLIENT);
  }, [modalClientContext]);

  useEffect(() => {
    if (modalClientContext?.selectedRow?.documento) {
      const tamanho = parseInt(
        modalClientContext?.selectedRow?.documento.replace(/[^0-9]/g, "")
      ).toString().length;
      setCpfCpnj(tamanho > 11 ? "cnpj" : "cpf");
    }
  }, [modalClientContext]);

  return (
    <div>
      <Modal
        open={modalClientContext.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style as any} noValidate autoComplete="off">
          <Typography id="modal-modal-title" variant="h4" component="h4">
            Cadastro de Cliente
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
                value={client.nome}
                onChange={(event) => {
                  setClient({ ...client, nome: event.target.value });
                }}
              />
              <div className={`${classes.divCpf}`}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Pessoa Fisica Ou Juridica?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={cpfCpnj}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="cpf"
                    control={<Radio />}
                    label="CPF"
                  />
                  <FormControlLabel
                    value="cnpj"
                    control={<Radio />}
                    label="CNPJ"
                  />
                </RadioGroup>
              </div>

              <TextField
                className={`${classes.inputs}`}
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
                className={`${classes.inputs}`}
                required
                id="outlined-required"
                type="email"
                label="E-mail"
                value={client.email}
                onChange={(event) => {
                  setClient({ ...client, email: event.target.value });
                }}
              />

              <InputMask
                mask={
                  cpfCpnj === "cnpj" ? "99.999.999/9999-99" : "999.999.999-99"
                }
                value={client.documento}
                onChange={(event) => {
                  setClient({
                    ...client,
                    documento: event.target.value,
                  });
                }}
              >
                {() => (
                  <TextField
                    className={`${classes.inputs}`}
                    required
                    id="outlined-required"
                    label={cpfCpnj === "cpf" ? "CPF" : "CNPJ"}
                  />
                )}
              </InputMask>
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
                value={client.cep}
                onChange={(event) => {
                  setClient({ ...client, cep: event.target.value });
                }}
              />
              <TextField
                className={`${classes.inputs}`}
                required
                id="outlined-required"
                label="Rua"
                value={client.logradouro}
                onChange={(event) => {
                  setClient({ ...client, logradouro: event.target.value });
                }}
              />

              <TextField
                className={`${classes.inputs}`}
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
                className={`${classes.inputs}`}
                required
                id="outlined-required"
                label="Bairro"
                value={client.bairro}
                onChange={(event) => {
                  setClient({ ...client, bairro: event.target.value });
                }}
              />
              <TextField
                className={`${classes.inputs}`}
                required
                id="outlined-required"
                label="Cidade"
                value={client.cidade}
                onChange={(event) => {
                  setClient({ ...client, cidade: event.target.value });
                }}
              />
              <TextField
                className={`${classes.inputs}`}
                required
                id="outlined-required"
                label="Estado"
                value={client.uf}
                onChange={(event) => {
                  setClient({ ...client, uf: event.target.value });
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
                value={client.marca}
                onChange={(event) => {
                  setClient({ ...client, marca: event.target.value });
                }}
              />
              <TextField
                className={`${classes.inputs}`}
                required
                id="outlined-required"
                label="Modelo"
                value={client.modelo}
                onChange={(event) => {
                  setClient({ ...client, modelo: event.target.value });
                }}
              />
              <TextField
                className={`${classes.inputs}`}
                required
                id="outlined-required"
                label="Ano"
                value={client.ano}
                onChange={(event) => {
                  setClient({ ...client, ano: event.target.value });
                }}
              />
            </div>
            <div className={`${classes.divButtons}`}>
              {!modalClientContext?.selectedRow ? (
                <Button
                  onClick={() => {
                    writeUserDataClient(client);
                    modalClientContext.setOpen(false);
                  }}
                  variant="contained"
                  color="success"
                  endIcon={<CheckIcon />}
                >
                  Cadastrar
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    writeUserDataClient(client);
                    modalClientContext.setOpen(false);
                  }}
                  variant="contained"
                  color="warning"
                  endIcon={<EditIcon />}
                >
                  Editar
                </Button>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalClient;
