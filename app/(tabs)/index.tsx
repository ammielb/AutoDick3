// HomeScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Appbar, Button, Text } from 'react-native-paper';
import Timer from '@/components/Timer';  // Import Timer component
import { StyleSheet, View } from 'react-native';

interface JsonData {
  amountOfFlags: number;
  firstFlag: string;
  firstTime: number;
  secondFlag: string;
  secondTime: number;
  thirdFlag: string;
  thirdTime: number;
}

const jsonData: JsonData = {
  amountOfFlags: 3,
  firstFlag: 'preset 1',
  firstTime: 10,
  secondFlag: 'flag 2',
  secondTime: 15,
  thirdFlag: 'flag 3',
  thirdTime: 5,
};

const preset2: JsonData = {
  amountOfFlags: 2,
  firstFlag: 'preset 2',
  firstTime: 4,
  secondFlag: 'flag 2 final flag',
  secondTime: 6,
  thirdFlag: 'no third flag',
  thirdTime: 13,
};

const preset3: JsonData = {
  amountOfFlags: 3,
  firstFlag: 'preset 3',
  firstTime: 4,
  secondFlag: 'flag 2',
  secondTime: 4,
  thirdFlag: 'last flag',
  thirdTime: 4
}

export default function HomeScreen() {
  const router = useRouter();
  const timerRef = useRef<any>(null);  // Create a ref to access Timer component

  const [currTime, setCurrTime] = useState<string>(new Date().toLocaleTimeString());
  const [currentPreset, setCurrentPreset] = useState<JsonData>(jsonData);

  // Change preset function
  const changeTimer = () => {
    setCurrentPreset((prev) => (prev === jsonData ? preset2 : jsonData));
    
    timerRef.current.resetTimer();  // Call resetTimer function from Timer
    
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="small">
        <Appbar.Content title="AutoDick" />
        <Text style={{ color: 'black', marginLeft: 8 }}>{currTime}</Text>
        <Button 
          mode="contained" 
          onPress={() => router.replace('./Presets')} 
          style={{ marginLeft: 16, marginRight: 16 }}
        >
          Presets
        </Button>
      </Appbar.Header>

      <Timer ref={timerRef} data={currentPreset} />  {/* Pass ref to Timer */}

      <Button 
        mode="contained" 
        onPress={changeTimer} 
        style={{ marginLeft: 16, marginRight: 16, height: 50, width: 150 }}
      >
        Change Preset
      </Button>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    color: 'black',
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
});
