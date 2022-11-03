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
import CarroForm from "./CarroForm";
import IconButton from "@mui/material/IconButton";
import { Theme } from "@material-ui/core";
import CustomAlert from "../utils/CustomAlert/CustomAlert";

const useStyles = makeStyles((theme: Theme) =>
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
      marginTop: "15px",
    },
    divCpf: {
      display: `flex`,
      flexDirection: `column`,
      alignItems: `center`,
    },
    style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      backgroundColor: "white",
      border: "2px solid #000",
      boxShadow: "24px",
      padding: "20px",
      display: "flex",
      flexWrap: "wrap",
      overflow: "auto",
      maxHeight: "-webkit-fill-available",
      [theme.breakpoints.down(1400)]: {
        width: "90%",
      },
    },
  })
);

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
  data: "",
  marca: "",
  modelo: "",
  ano: "",
  placa: '',
  carros: [],
};

const ModalClient: React.FC = () => {
  const modalClientContext: any = useContext(DataContext);
  const classes = useStyles();
  const handleClose = () => modalClientContext.setOpen(false);
  const [client, setClient] = React.useState(DEFAULT_CLIENT);
  const [cpfCpnj, setCpfCpnj] = React.useState("cpf");
  const [openAlertSucesso, setOpenAlertSucesso] = React.useState(false);
  const [openAlertFail, setOpenAlertFail] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpfCpnj((event.target as HTMLInputElement).value);
  };

  function handleAddCarro() {
    const clonedData: any = { ...client };
    if (!clonedData.carros) {
      clonedData.carros = [];
    }
    clonedData.carros.push({
      marca: client.marca,
      modelo: client.modelo,
      ano: client.ano,
      placa: client.placa,
    });
    clonedData.marca = "";
    clonedData.modelo = "";
    clonedData.ano = "";
    clonedData.placa = "";

    setClient(clonedData);
  }

  useEffect(() => {
    if (!modalClientContext?.selectedRow && client?.cep?.length === 8) {
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
        <Box
          component="form"
          className={`${classes.style}`}
          noValidate
          autoComplete="off"
        >
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
              <CarroForm client={client} setClient={setClient} />
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
              <TextField
                className={`${classes.inputs}`}
                required
                id="outlined-required"
                label="Placa"
                value={client.placa}
                onChange={(event) => {
                  setClient({ ...client, placa: event.target.value });
                }}
              />
              <IconButton
                color="success"
                aria-label="sucesso"
                component="span"
                onClick={() => handleAddCarro()}
              >
                <CheckIcon />
              </IconButton>
            </div>
            <Divider />
            <div className={`${classes.divButtons}`}>
              {!modalClientContext?.selectedRow ? (
                <Button
                  onClick={() => {
                    if (!client?.carros[0] || !client.nome) {
                      setOpenAlertFail(true);
                    } else {
                      writeUserDataClient(client);
                      modalClientContext.setOpen(false);
                      setOpenAlertSucesso(true);
                    }
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
                    setOpenAlertSucesso(true);
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
          {openAlertFail && (
            <CustomAlert
              severity={"error"}
              color={"error"}
              setOpenAlert={setOpenAlertFail}
              openAlert={openAlertFail}
              text={"Prencha ao menos o nome e/ou adicione 1 carro no minimo!"}
              title={"Falha!"}
            />
          )}
        </Box>
      </Modal>
      {openAlertSucesso && (
        <CustomAlert
          severity={"success"}
          color={"success"}
          setOpenAlert={setOpenAlertSucesso}
          openAlert={openAlertSucesso}
          text={"Cadastro efetuado com Sucesso!"}
          title={"Sucesso!"}
        />
      )}
    </div>
  );
};

export default ModalClient;
