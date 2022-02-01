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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  viewColumn: {
    display: "flex",
    flexDirection: "column",
    marginRight: "20px",
  },
  textBold: {
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
    marginBottom: "2px",
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

type ServicosProdutosProps = {
  nota: Nota;
};

const ServicosProdutos: React.FC<ServicosProdutosProps> = ({ nota }) => {
  return (
    <>
      <View style={styles.clientViewBorder}>
        <Text style={styles.title}>SERVIÇOS E PRODUTOS</Text>
        <View style={styles.viewHeader}>
          <View style={styles.viewColumn}>
            <Text style={styles.textNormal}>Valor dos Serviços:</Text>
            <Text style={styles.textNormal}>Valor das Pecas/Produtos:</Text>
            <Text style={styles.textBold}>Valor TOTAL:</Text>
          </View>

          <View style={styles.viewColumn}>
            <Text style={styles.textNormal}>R$: {nota.valorServico}</Text>
            <Text style={styles.textNormal}>R$: {nota.valorProduto}</Text>
            <Text style={styles.textBold}>R$: {nota.valorTotal}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ServicosProdutos;
