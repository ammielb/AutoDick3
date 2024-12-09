import React, { useState } from 'react';
import { Button, View, Text, Platform } from 'react-native';
import Papa from 'papaparse';
import * as FileSystem from 'expo-file-system';

export default function CsvWritingScreen() {
  const [csvDataUrl, setCsvDataUrl] = useState<string | null>(null);

  const prepareCSV = async () => {
    const data = [
      ["vlag", "Tijd", "klassen"],
      ["Papa vlag", "16:53", "dsaf"],
      ["Oranje vlag", "17:00", "dsagf"],
    ];

    const csvString = Papa.unparse(data);

    if (Platform.OS === 'web') {
      // Voorbereiden, maar nog niet downloaden
      const blob = new Blob([csvString], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      setCsvDataUrl(url); // Opslaan in state voor later gebruik
      console.log("CSV voorbereid, klaar om te downloaden.");
    } else {
      // Voor Android/iOS: gebruik expo-file-system
      const fileUri = `${FileSystem.documentDirectory}text.csv`;
      try {
        await FileSystem.writeAsStringAsync(fileUri, csvString, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        console.log("CSV opgeslagen:", fileUri);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const downloadCSV = () => {
    if (csvDataUrl) {
      const link = document.createElement('a');
      link.href = csvDataUrl;
      link.download = 'text.csv';
      link.click();
      URL.revokeObjectURL(csvDataUrl); // Vrijmaken van geheugen
      setCsvDataUrl(null); // Reset de URL
      console.log("CSV gedownload.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>CSV Schrijven Demo</Text>
      <Button title="Bereid CSV voor" onPress={prepareCSV} />
      {Platform.OS === 'web' && csvDataUrl && (
        <Button title="Download CSV" onPress={downloadCSV} />
      )}
    </View>
  );
}