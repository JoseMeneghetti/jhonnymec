import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { fireBaseSignInWithEmailAndPassword } from "../../firebase/authFunctions";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { Theme } from "@material-ui/core";
import logo from "../nota/modelo/assets/JHonny.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      [theme.breakpoints.up("md")]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(3)}`,
    },
    avatar: {
      margin: theme.spacing(),
      width: "100px!important",
      height: "100px!important",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(),
    },
    submit: {
      marginTop: theme.spacing(3),
    },
  })
);

// const theme = createTheme();

const Login: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erroLogin, setErroLogin] = useState(false);

  const handleLogin = async () => {
    const response = await fireBaseSignInWithEmailAndPassword(email, password);
    if (response.code !== 200) {
      setErroLogin(true);
    } else {
      console.log(response?.data);
    }
  };

  return (
    // <ThemeProvider theme={theme}>
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar
          src={logo}
          className={classes.avatar}
          variant="rounded"
        ></Avatar>
        <Typography component="h1" variant="h5">
          LOGIN
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              onFocus={() => erroLogin && setErroLogin(false)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Senha</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              onFocus={() => erroLogin && setErroLogin(false)}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembre-me"
          />
          <div>
            {erroLogin && (
              <Alert onClose={() => setErroLogin(false)} severity="error">
                Usuario ou Senha invalidos!
              </Alert>
            )}
          </div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleLogin()}
          >
            Entrar
          </Button>
        </form>
      </Paper>
    </main>
    // </ThemeProvider>
  );
};

export default Login;
