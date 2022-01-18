import * as React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import Logo from "./assets/JHonny.png";
import { Nota } from "../../typings/global";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
    color: "#525252",
    fontFamily: "roboto",
  },
  logo: {
    marginLeft: "20px",
    width: "100px",
    height: "100px",
  },
  viewHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  viewColumn: {
    display: "flex",
    flexDirection: "column",
    marginRight: "20px",
  },
  textTitle: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    marginBottom: "15px",
    fontFamily: "roboto",
  },
  textNormal: {
    fontSize: 12,
    color: "#525252",
    fontWeight: "normal",
    marginBottom: "5px",
    fontFamily: "roboto",
  },  
  textNormalAdress: {
    fontSize: 10,
    color: "#525252",
    fontWeight: "normal",
    marginBottom: "5px",
    fontFamily: "roboto",
  },
  textBold: {
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
    padding: "5px",
    fontFamily: "roboto",
  },
  viewBorder: {
    border: "1px solid black",
    marginLeft: "10px",
  },
});

type HeaderProps = {
  nota: Nota;
};

const HeaderPdf: React.FC<HeaderProps> = ({ nota }) => {
  return (
    <>
      <Text style={styles.title}>REGISTRO DE ORDEM DE SERVICO</Text>
      <View style={styles.viewHeader}>
        <View style={styles.viewColumn}>
          <Image source={Logo} style={styles.logo} />
        </View>

        <View style={styles.viewColumn}>
          <Text style={styles.textTitle}>Jhonny Mec Oficina Mecanica</Text>
          <Text style={styles.textNormal}>CNPJ: XX.XXX.XXX.XXXXX.XX</Text>
          <Text style={styles.textNormal}>
            (11) 4411-0414 - (11) 97428-2586
          </Text>
          <Text style={styles.textNormal}>falecomjhonnymec@gmail.com</Text>
          <Text style={styles.textNormalAdress}>
            Rua Sebastião César, 73 - Parque dos Coqueiros - Atibaia
          </Text>
        </View>

        <View style={styles.viewColumn}>
          <View style={styles.viewBorder}>
            <Text style={styles.textBold}>
              O.S N: <Text style={styles.textNormal}>{nota.id}</Text>
            </Text>
            <Text style={styles.textBold}>
              Data de abertura:
              <Text style={styles.textNormal}> {nota.data}</Text>
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default HeaderPdf;
