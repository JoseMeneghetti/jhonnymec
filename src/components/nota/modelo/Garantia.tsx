import * as React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

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
  viewColumn: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "5px",
    alignItems: "center",
  },
  textNormal: {
    fontSize: 12,
    color: "#525252",
    fontWeight: "normal",
    marginBottom: "5px",
    fontFamily: "roboto",
  },
});

const Garantia: React.FC = () => {
  return (
    <>
      <View style={styles.clientViewBorder}>
        <Text style={styles.title}>GARANTIA E OBSERVACOES</Text>
        <View style={styles.viewHeader}>
          <View style={styles.viewColumn}>
            <Text style={styles.textNormal}>
              Serviços não possuem garantia, peças e produtos apenas contra
              defeito de fabricação
            </Text>
            <Text style={styles.textNormal}>*Consultar Exceções</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Garantia;
