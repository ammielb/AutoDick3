import { jsonToCSV } from 'react-native-csv';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import React from 'react';
import { Button } from 'react-native-paper';
import { View } from 'react-native';

export default function MakeCSV() {
  const handleGenerateCSV = async () => {
    try {
      // JSON Data
      const jsonData = [
        {
          "Column 1": "Name",
          "Column 2": "Surname",
          "Column 3": "Email",
          "Column 4": "Info",
        },
      ];

      // Convert JSON to CSV
      const CSV = jsonToCSV(jsonData);

      // Define file path
      const fileUri = `${FileSystem.documentDirectory}fromdata.csv`;

      // Request Permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        console.error("Media Library permission not granted");
        return;
      }

      // Write File
      await FileSystem.writeAsStringAsync(fileUri, CSV);
      console.log("File written at:", fileUri);

      // Save File to Media Library
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Forms", asset, false);
      console.log("CSV saved successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View>
      <Button mode="contained" onPress={handleGenerateCSV}>
        Generate CSV
      </Button>
    </View>
  );
}
