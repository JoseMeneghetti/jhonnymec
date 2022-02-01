import { Page, Document, StyleSheet, Font } from "@react-pdf/renderer";
import HeaderPdf from "./HeaderPdf";
import ClientPdf from "./ClientePdf";
import Fonts from "./assets/RobotoCondensed-Regular.ttf";
import { Nota } from "../../typings/global";
import CarroInfo from "./CarroInfo";
import ServicosProdutos from "./ServicosProdutos";
import ServicoPrestado from "./ServicoPrestado";
import Assinatura from "./Assinatura";
import Garantia from "./Garantia";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
});

Font.register({
  family: "roboto",
  src: Fonts,
});

export const MyDocument = (nota: Nota) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <HeaderPdf nota={nota}/>
      <ClientPdf nota={nota} />
      <CarroInfo nota={nota} />
      <ServicoPrestado nota={nota} />
      <ServicosProdutos nota={nota} />
      <Garantia />
      <Assinatura />
    </Page>
  </Document>
);
