import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// Create filename with coresponding date in name
const getFileUri = () => 
  `${FileSystem.documentDirectory}Race_${new Date().toISOString().slice(0, 10)}.csv`;

// Function to add line
export const appendToCSV = async (vlag: string, klassen: string) => {
  const fileUri = getFileUri();

  try {
    // Check if file exists
    const fileExists = await FileSystem.getInfoAsync(fileUri);

    let updateContent;

    if (fileExists.exists) {
      // Read file
      const existingContent = await FileSystem.readAsStringAsync(fileUri);

      // Add line
      const newLine = `${vlag}, ${new Date().toLocaleTimeString()}, ${klassen}`;
      updateContent = `${existingContent}\n${newLine}`;
    } else {
      // Create file
      const newLine = `${vlag}, ${new Date().toLocaleTimeString()}, ${klassen}`;
      updateContent = `Vlag, Tijd, Klasse\n${newLine}`;
    }

    // Write line to file
    await FileSystem.writeAsStringAsync(fileUri, updateContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    console.log(`Regel toegevoegd:\n${fileUri}`);
  } catch (e) {
    console.error("Fout bij toevoegen aan CSV:", e);
  }
};

// Function to download file
export const downloadCSV = async () => {
  const fileUri = getFileUri();

  try {
    // Download file if exists
    const fileExists = await FileSystem.getInfoAsync(fileUri);

    if (fileExists.exists) {
      await Sharing.shareAsync(fileUri);
      console.log("Bestand gedeeld:", fileUri);
    } else {
      console.warn("CSV-bestand bestaat niet, kan niet delen.");
    }
  } catch (e) { //else error
    console.error("Fout bij delen van het bestand:", e);
  }
};
