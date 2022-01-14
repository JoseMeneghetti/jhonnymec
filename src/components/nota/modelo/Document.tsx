import * as React from "react";
import { Page, Document, StyleSheet, Font } from "@react-pdf/renderer";
import HeaderPdf from "./HeaderPdf";
import ClientPdf from "./ClientePdf";
import Fonts from "./assets/RobotoCondensed-Regular.ttf"
import { Nota } from "../../typings/global";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
});

Font.register({
  family: "roboto",
  src: Fonts,
});

export const MyDocument = (nota : Nota) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <HeaderPdf />
      <ClientPdf nota={nota}/>
    </Page>
  </Document>
);
