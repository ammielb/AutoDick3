import React from 'react';
import { Button, View, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function CsvAppendingScreen() {
  const appendToCSV = async () => {
    const fileUri = `${FileSystem.documentDirectory}text.csv`;

    try {
      // Controleer of het bestand al bestaat
      const fileExists = await FileSystem.getInfoAsync(fileUri);

      if (fileExists.exists) {
        // Lees de bestaande inhoud van het bestand
        const existingContent = await FileSystem.readAsStringAsync(fileUri);

        // Voeg een nieuwe lijn toe
        const newLine = "Nieuwe vlag, 18:30, Klasse C";
        const updatedContent = `${existingContent}\n${newLine}`;

        // Schrijf de bijgewerkte inhoud terug naar het bestand
        await FileSystem.writeAsStringAsync(fileUri, updatedContent, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        console.log("Nieuwe lijn toegevoegd:", newLine);
      } else {
        // Als het bestand niet bestaat, maak een nieuw bestand met headers en eerste regel
        const initialContent = "Vlag, Tijd, Klasse\nNieuwe vlag, 18:30, Klasse C";
        await FileSystem.writeAsStringAsync(fileUri, initialContent, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        console.log("Nieuw CSV-bestand aangemaakt:", fileUri);
      }
    } catch (error) {
      console.error("Fout bij het schrijven naar CSV:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>CSV Toevoegen Demo</Text>
      <Button title="Voeg lijn toe aan CSV" onPress={appendToCSV} />
    </View>
  );
}
