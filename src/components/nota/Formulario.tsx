import * as React from "react";
import Typography from "@mui/material/Typography";
import { Divider, TextField } from "@mui/material";
import { useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import { Nota } from "../typings/global";
import InputAdornment from "@mui/material/InputAdornment";
import { Theme } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";

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
    },
  })
);

type FormularioProps = {
  nota: Nota;
  setNota: React.Dispatch<React.SetStateAction<any>>;
  DEFAULT_NOTA: Nota;
};
const Formulario: React.FC<FormularioProps> = ({
  nota,
  setNota,
  DEFAULT_NOTA,
}) => {
  const modalClientContext: any = useContext(DataContext);
  const [selectedCar, setSelectedCar] = React.useState<string | null | any>(
    null
  );

  const classes = useStyles();

  useEffect(() => {
    if (modalClientContext?.selectedRow) {
      setNota(modalClientContext?.selectedRow);
    } else setNota(DEFAULT_NOTA);
  }, [modalClientContext]);

  useEffect(() => {
    if (nota.id) {
      setNota({ ...nota, clientId: nota.id });
    }
  }, [nota.id]);

  useEffect(() => {
    if (nota?.valorServico?.length || nota?.valorProduto?.length) {
      setNota({
        ...nota,
        valorTotal: Number(nota.valorProduto) + Number(nota.valorServico),
      });
    }
  }, [nota.valorProduto, nota.valorServico]);

  useEffect(() => {
    if (selectedCar) {
      setNota({
        ...nota,
        marca: selectedCar.marca,
        modelo: selectedCar.modelo,
        ano: selectedCar.ano,
      });
    }
  }, [selectedCar]);

  return (
    <div>
      <Typography id="modal-modal-title" variant="h4" component="h4">
        Nota de Serviço
      </Typography>
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
        <Divider />
        <Typography id="modal-modal-title" variant="h6" component="h6">
          Cadastro de Endereço
        </Typography>
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
        <Divider />

        <Typography id="modal-modal-title" variant="h6" component="h6">
          Especificações do Carro
        </Typography>
        {nota.carros ? (
          <Autocomplete
            options={nota.carros}
            getOptionLabel={(option) => `${option.marca} ${option.modelo} - ${option.ano}`}
            id="combo-box-demo"
            renderInput={(params) => <TextField {...params} />}
            value={selectedCar}
            onChange={(_: any, newValue: string | null) => {
              setSelectedCar(newValue);
            }}
          />
        ) : (
          <></>
        )}

        <div className={`${classes.divStyle}`}>
          <TextField
            className={`${classes.inputs}`}
            required
            disabled
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
            disabled
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
            disabled
            id="outlined-required"
            label="Ano"
            value={nota.ano}
            onChange={(event) => {
              setNota({ ...nota, ano: event.target.value });
            }}
          />
          <TextField
            className={`${classes.inputs}`}
            required
            id="outlined-required"
            label="Km"
            value={nota.km}
            onChange={(event) => {
              setNota({ ...nota, km: event.target.value });
            }}
          />
          <TextField
            className={`${classes.inputs}`}
            required
            id="outlined-required"
            label="Detalhes"
            value={nota.detalhes}
            onChange={(event) => {
              setNota({ ...nota, detalhes: event.target.value });
            }}
          />
        </div>
        <Divider />
        <Typography id="modal-modal-title" variant="h6" component="h6">
          Serviços e Produtos
        </Typography>
        <div className={`${classes.divStyle}`}>
          <TextField
            className={`${classes.inputs}`}
            required
            id="outlined-required"
            label="Valor dos Serviços"
            type="number"
            value={nota.valorServico}
            onChange={(event) => {
              setNota({ ...nota, valorServico: event.target.value });
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
          <TextField
            className={`${classes.inputs}`}
            required
            id="outlined-required"
            label="Valor de Peças/Produtos"
            type="number"
            value={nota.valorProduto}
            onChange={(event) => {
              setNota({ ...nota, valorProduto: event.target.value });
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
        </div>
        <Divider />
        <Typography id="modal-modal-title" variant="h6" component="h6">
          Descrição dos Serviços Prestados
        </Typography>
        <div className={`${classes.divStyle}`}>
          <TextField
            className={`${classes.inputs}`}
            required
            fullWidth
            id="outlined-required"
            label="Serviços Prestados"
            type="text"
            value={nota.servicosPrestados}
            onChange={(event) => {
              setNota({ ...nota, servicosPrestados: event.target.value });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Formulario;
