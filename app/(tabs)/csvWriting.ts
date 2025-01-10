import React, { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function CsvAppendingScreen(){
  const fileUri = `${FileSystem.documentDirectory}Race_${new Date().toISOString().slice(0, 10)}.csv`;
  const [logMessage, setLogMessage] = useState("");

  const appendToCSV = async () => {
    try{

      //check if file exists
      const fileExists = await FileSystem.getInfoAsync(fileUri);

      let updateContent;

      if (fileExists.exists){
        //read file info
        const existingContent = await FileSystem.readAsStringAsync(fileUri);

        //add new line
        const newLine = `Nieuwe vlag, ${new Date().toLocaleTimeString()}, Klasse ${Math.floor(Math.random() * 10)}`;
        updateContent = `${existingContent}\n${newLine}`
      }else{
        //make new file
        updateContent = "Vlag, Tijd, Klasse\n Nieuwe vlag, 18:30, Klassen 1";
      }

      //write new lines to file
      await FileSystem.writeAsStringAsync(fileUri, updateContent,{
        encoding: FileSystem.EncodingType.UTF8,
      });
      setLogMessage(`nieuwe regel toegevoegd:\n${fileUri}`);
      console.log("Nieuwe inhoud:\n", updateContent);
    }catch (e){
      console.error("Fout bij toevoegen aan CSV:", e);
      setLogMessage("Er is een fout opgetreden.");
    }
  };

  const downloadCSV = async () => {
    try{
      //download or share file
      const fileExists = await FileSystem.getInfoAsync(fileUri);

      if(fileExists.exists){
        await Sharing.shareAsync(fileUri);
        setLogMessage("File sharred");
      }else{
        setLogMessage("No csv file to share");
      }
    }catch(e){
      console.log(e);
    }
  };


  
}