import * as React from 'react';
import { useRouter } from 'expo-router';
import { Appbar, Button, Text } from 'react-native-paper';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          onPress={() => router.replace('./../')}
        >
          Home
        </Button>
      </Appbar.Header>

      <Button 
        mode="contained" 
        onPress={() => setVlaggen(["papa", "Opa", "geel"])}
      >
        Hoeren Knop
      </Button>
      <Button mode="contained" onPress={savePreset}>
        Save Preset
      </Button>
    </View>
  );
};

export default Presets;
