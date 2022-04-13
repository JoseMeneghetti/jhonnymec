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
  textBold: {
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
    fontFamily: "roboto",
  },
  textNormal: {
    fontSize: 12,
    color: "#525252",
    fontWeight: "normal",
    marginBottom: "5px",
    fontFamily: "roboto",
  },
});

type CarroInfoProps = {
  nota: Nota;
};

const CarroInfo: React.FC<CarroInfoProps> = ({ nota }) => {
  return (
    <>
      <View style={styles.clientViewBorder}>
        <Text style={styles.title}>DADOS DO AUTOMOVEL</Text>
        <View style={styles.viewHeader}>
          <View style={styles.viewRow}>
            <Text style={styles.textBold}>
              Marca:
              <Text style={styles.textNormal}> {nota.marca}</Text>
            </Text>
            <Text style={styles.textBold}>
              Modelo:
              <Text style={styles.textNormal}> {nota.modelo}</Text>
            </Text>
            <Text style={styles.textBold}>
              Ano:
              <Text style={styles.textNormal}> {nota.ano}</Text>
            </Text>
            <Text style={styles.textBold}>
              Placa:
              <Text style={styles.textNormal}> {nota.placa}</Text>
            </Text>
          </View>
          <View style={styles.viewRow}>
            <Text style={styles.textBold}>
              Detalhes:
              <Text style={styles.textNormal}>{nota.detalhes}</Text>
            </Text>
            <Text style={styles.textBold}>
              Km:
              <Text style={styles.textNormal}> {nota.km}</Text>
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default CarroInfo;
