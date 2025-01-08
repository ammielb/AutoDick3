import { jsonToCSV, readRemoteFile } from 'react-native-csv';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export async function makeCSV() {

    const jsonData = `[
        {
            "Column 1": "Name",
            "column 2": "Surename",
            "Column 3": "Email",
            "Column 4": "Info"
        }
    ]`;
    
    const CSV = jsonToCSV(jsonData);

    // Name file
    const directoryUri = FileSystem.documentDirectory;
    const fileUri = directoryUri + 'fromdata.csv';

    //ask permission
    const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (perm.status != 'granted') {
      console.log("Permission not Granted!")
      return;
    }
    
    // Write the file to system
    FileSystem.writeAsStringAsync(fileUri, CSV)
    
    try {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync('forms');
      console.log(album)
      if (album == null) {
        await MediaLibrary.createAlbumAsync('forms', asset, true);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, true);
      }
    } catch (error) {
      console.log(error);
    }
}