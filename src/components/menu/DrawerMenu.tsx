import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Clientes from "../clientes/Clientes";
import Nota from "../nota/Nota";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import ViewNota from "../nota/ViewNota";

const drawerWidth = 240;

export default function DrawerMenu() {
  const modalClientContext: any = useContext(DataContext);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {modalClientContext.menuName[1]}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {["Clientes", "Gerar Nota", "Relatorio de Notas"].map(
            (text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => {
                  modalClientContext.setMenuName([index, text]);
                  modalClientContext.setSelectedRow(undefined);
                }}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {modalClientContext.menuName[0] === 0 ? (
          <Clientes />
        ) : modalClientContext.menuName[0] === 1 ? (
          <Nota />
        ) : modalClientContext.menuName[0] === 2 ? (
          <ViewNota />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
