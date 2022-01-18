import * as React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  viewRow: {
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "center",
  },
  textNormal: {
    fontSize: 12,
    color: "#525252",
    fontWeight: "normal",
    fontFamily: "roboto",
  },
  underline: {
    fontSize: 12,
    color: "#525252",
    fontWeight: "normal",
    fontFamily: "roboto",
    borderTop: "1px solid black"
  },
});

const Assinatura: React.FC = () => {
  return (
    <>
      <View style={styles.viewRow}>
        <Text style={styles.textNormal}>Jhonny MEC</Text>
        <Text style={styles.textNormal}>XX.XXX.XXX/0001-0</Text>
        <Text style={styles.underline}>Responsabilidade Técnica</Text>
      </View>
    </>
  );
};

export default Assinatura;
