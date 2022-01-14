import * as React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { padding } from "@material-ui/system";
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
    color: "grey",
    fontWeight: "normal",
    marginBottom: "5px",
    fontFamily: "roboto",
  },
});

type ClientPdfProps = {
  nota: Nota
}

const ClientPdf: React.FC<ClientPdfProps> = ({nota}) => {
  return (
    <>
      <View style={styles.clientViewBorder}>
        <Text style={styles.title}>DADOS DO CLIENTE</Text>
        <View style={styles.viewHeader}>
          <View style={styles.viewColumn}>
            <Text style={styles.textBold}>
              Nome:
              <Text style={styles.textNormal}> {nota.nome}</Text>
            </Text>
            <Text style={styles.textBold}>
              Endereco:
              <Text style={styles.textNormal}>{nota.logradouro}, {nota.numero}</Text>
            </Text>
            <Text style={styles.textBold}>
              Cidade:
              <Text style={styles.textNormal}> {nota.cidade}</Text>
            </Text>
            <Text style={styles.textBold}>
              Telefone:
              <Text style={styles.textNormal}> {nota.telefone}</Text>
            </Text>
          </View>

          <View style={styles.viewColumn}>
            <Text style={styles.textBold}>
              CPF/CNPJ:
              <Text style={styles.textNormal}> {nota.documento}</Text>
            </Text>
            <Text style={styles.textBold}>
              Bairro:
              <Text style={styles.textNormal}> {nota.bairro}</Text>
            </Text>
            <Text style={styles.textBold}>
              CEP:
              <Text style={styles.textNormal}> {nota.cep}</Text>
            </Text>
            <Text style={styles.textBold}>
              E-Mail:
              <Text style={styles.textNormal}> {nota.email}</Text>
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ClientPdf;
