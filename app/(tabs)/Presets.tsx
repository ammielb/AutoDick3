import * as React from 'react';
import { useRouter } from 'expo-router';
import { Appbar, Button, Text } from 'react-native-paper';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appendToCSV, downloadCSV } from './csvWriting';

const Presets: React.FC = () => {
  const router = useRouter();
  const [currTime, setCurrTime] = React.useState<string>(new Date().toLocaleTimeString());
  const [vlaggen, setVlaggen] = React.useState<string[]>([]);

  // useEffect to update the time every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date().toLocaleTimeString());
    }, 1000); // update every 1 second

    return () => clearInterval(interval); // cleanup interval on component unmount
  }, []);

  // Function to save vlaggen to AsyncStorage
  const savePreset = async () => {
    try {
      await AsyncStorage.setItem('vlaggen', JSON.stringify(vlaggen));
      console.log("Preset saved successfully.");
    } catch (error) {
      console.error("Failed to save preset:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="AutoDick" />
        <Text>{currTime}</Text>
        <Button
          mode="contained"
          style={{ marginRight: 16, marginLeft: 16, width: 96 }}
          onPress={() => router.replace('./csvWriting')}
        >
          Home
        </Button>
      </Appbar.Header>

      <Button 
        mode="contained" 
        onPress={() => appendToCSV("papa", "1")}
      >
        Hoeren Knop
      </Button>
      <Button mode="contained" onPress={downloadCSV}>
        Save Preset
      </Button>
    </View>
  );
};

export default Presets;
