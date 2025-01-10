import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// Bestandspad dynamisch met datum
const getFileUri = () => 
  `${FileSystem.documentDirectory}Race_${new Date().toISOString().slice(0, 10)}.csv`;

// Functie om een regel toe te voegen aan een CSV-bestand
export const appendToCSV = async (vlag: string, klassen: string) => {
  const fileUri = getFileUri();

  try {
    // Controleer of het bestand al bestaat
    const fileExists = await FileSystem.getInfoAsync(fileUri);

    let updateContent;

    if (fileExists.exists) {
      // Bestaande inhoud lezen
      const existingContent = await FileSystem.readAsStringAsync(fileUri);

      // Nieuwe regel toevoegen
      const newLine = `${vlag}, ${new Date().toLocaleTimeString()}, ${klassen}`;
      updateContent = `${existingContent}\n${newLine}`;
    } else {
      // Nieuw bestand met header maken
      const newLine = `${vlag}, ${new Date().toLocaleTimeString()}, ${klassen}`;
      updateContent = `Vlag, Tijd, Klasse\n${newLine}`;
    }

    // De inhoud schrijven naar het bestand
    await FileSystem.writeAsStringAsync(fileUri, updateContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    console.log(`Regel toegevoegd:\n${fileUri}`);
  } catch (e) {
    console.error("Fout bij toevoegen aan CSV:", e);
  }
};

// Functie om een CSV-bestand te downloaden (delen)
export const downloadCSV = async () => {
  const fileUri = getFileUri();

  try {
    // Bestand delen als het bestaat
    const fileExists = await FileSystem.getInfoAsync(fileUri);

    if (fileExists.exists) {
      await Sharing.shareAsync(fileUri);
      console.log("Bestand gedeeld:", fileUri);
    } else {
      console.warn("CSV-bestand bestaat niet, kan niet delen.");
    }
  } catch (e) {
    console.error("Fout bij delen van het bestand:", e);
  }
};
