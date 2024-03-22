import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://todimo.vteximg.com.br/arquivos/logo2023.png?v=638211623014330000"
      style="width: 90vw;" />
  </body>
</html>
`;


export default function App() {

  const [selectedPrinter, setSelectedPrinter] = React.useState<any>();

  const print = async () => {
    console.log("Imprimindo...")
    console.log("html", html);
    console.log("selectedPrinter", selectedPrinter);
  }

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.title}>
        <Text>App Printer Sewoo!!!</Text>
      </View>
      <View style={styles.button}>
        <Button title='Imprimir' onPress={print}></Button>
      </View>
      <View style={styles.button}>
        <Button title="Print to PDF file" onPress={printToFile} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    height: "30%"
  },
  button: {
    height: "20%"
  }
});
