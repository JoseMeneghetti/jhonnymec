import React, { useState } from "react";
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
import logo from "../nota/modelo/assets/JHonny.png";
import Box from "@mui/material/Box";

const styles = {
  main: {
    width: {
      xs: "auto",
      md: 400,
    },
    display: "block", // Fix IE 11 issue.
    marginRight: {
      xs: 3,
      md: "auto",
    },
    marginLeft: {
      xs: 3,
      md: "auto",
    },
  },
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 3,
  },
  avatar: {
    margin: 1,
    width: "100px!important",
    height: "100px!important",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 1,
  },
  submit: {
    marginTop: 3,
  },
};

// const theme = createTheme();

const Login: React.FC = () => {
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
    <Box sx={styles.main}>
      <CssBaseline />
      <Paper sx={styles.paper}>
        <Avatar
          src={logo}
          sx={styles.avatar}
          variant="rounded"
        ></Avatar>
        <Typography component="h1" variant="h5">
          LOGIN
        </Typography>
        <FormControl sx={styles.form}>
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
            sx={styles.submit}
            onClick={() => handleLogin()}
          >
            Entrar
          </Button>
        </FormControl>
      </Paper>
    </Box>
    // </ThemeProvider>
  );
};

export default Login;
