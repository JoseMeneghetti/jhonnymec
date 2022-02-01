import * as React from "react";
import { TextField } from "@mui/material";
import { createStyles, makeStyles } from "@material-ui/styles";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
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
      width: '100%',
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

type CarroFormProps = {
  client: any;
  setClient: any;
};

const CarroForm: React.FC<CarroFormProps> = ({ client, setClient }) => {
  const classes = useStyles();

  function handleExcluiCarro(index: number) {
    const clonedData: any = { ...client };

    clonedData.carros.splice(index, 1);

    setClient(clonedData);
  }

  function handleChange(e: any, index: number) {
    const clonedData: any = { ...client };
    clonedData.carros[index][e.target.name] = e.target.value;

    setClient(clonedData);
  }

  if (client.carros) {
    return (
      <>
        {client.carros.map((_: any, index: any) => {
          return (
            <div className={`${classes.divStyle}`}>
              <TextField
                className={`${classes.inputs}`}
                required
                name={"marca"}
                id="outlined-required"
                label="Marca"
                value={client.carros[index]?.marca}
                onChange={(event) => {
                  handleChange(event, index);
                }}
              />
              <TextField
                className={`${classes.inputs}`}
                required
                id="outlined-required"
                label="Modelo"
                name={"modelo"}
                value={client.carros[index]?.modelo}
                onChange={(event) => {
                  handleChange(event, index);
                }}
              />
              <TextField
                className={`${classes.inputs}`}
                required
                id="outlined-required"
                label="Ano"
                name={"ano"}
                value={client.carros[index]?.ano}
                onChange={(event) => {
                  handleChange(event, index);
                }}
              />
              <IconButton
                color="error"
                aria-label="exclude"
                component="span"
                onClick={() => handleExcluiCarro(index)}
              >
                <CancelIcon />
              </IconButton>
            </div>
          );
        })}
      </>
    );
  } else {
    return <></>;
  }
};

export default CarroForm;
