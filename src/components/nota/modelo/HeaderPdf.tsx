import * as React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import Logo from "./assets/JHonny.png";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "roboto",
  },
  logo: {
    marginLeft: "20px",
    width: "85px",
    height: "85px",
  },
  viewHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    color: "grey",
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

const HeaderPdf: React.FC = () => {
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
          <Text style={styles.textNormal}>xxxxx-xxxx</Text>
          <Text style={styles.textNormal}>
            Rua Papa Paulo VI, 127, Vila Thais - Atibaia - SP
          </Text>
        </View>

        <View style={styles.viewColumn}>
          <View style={styles.viewBorder}>
            <Text style={styles.textBold}>
              O.S N: <Text style={styles.textNormal}>00000000</Text>
            </Text>
            <Text style={styles.textBold}>
              Data de abertura:
              <Text style={styles.textNormal}> 13/01/2022</Text>
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default HeaderPdf;
