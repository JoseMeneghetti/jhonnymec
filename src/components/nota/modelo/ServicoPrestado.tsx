import * as React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Nota } from "../../typings/global";

const styles = StyleSheet.create({
  clientViewBorder: {
    border: "1px solid black",
    margin: "10px 20px",
    padding: "7px 0",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    color: "black",
    marginBottom: "10px",
    fontFamily: "roboto",
  },
  viewHeader: {
    display: "flex",
    flexDirection: "column",
    padding: "0 20px",
    flexWrap: "wrap",
  },
  viewRow: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "5px",
    justifyContent: "space-between",
  },
  textNormal: {
    fontSize: 12,
    color: "#525252",
    fontWeight: "normal",
    marginBottom: "5px",
    fontFamily: "roboto",
  },
});

type ServicoPrestadoProps = {
  nota: Nota;
};

const ServicoPrestado: React.FC<ServicoPrestadoProps> = ({ nota }) => {
  return (
    <>
      <View style={styles.clientViewBorder}>
        <Text style={styles.title}>ESPECIFICACAO DOS SERVIÇOS PRESTADOS</Text>
        <View style={styles.viewHeader}>
          <View style={styles.viewRow}>
            <Text style={styles.textNormal}>{nota.servicosPrestados}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ServicoPrestado;
