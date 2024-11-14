// HomeScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Appbar, Button, Text, Card } from 'react-native-paper';
import Timer from '@/components/Timer';  // Import Timer component
import { StyleSheet, View, ScrollView } from 'react-native';

interface JsonData {
  amountOfFlags: number;
  firstFlag: string;
  firstTime: number;
  secondFlag: string;
  secondTime: number;
  thirdFlag: string;
  thirdTime: number;
}

const preset1: JsonData = {
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
  const [currentPreset, setCurrentPreset] = useState<JsonData>(preset1);

  // Change preset function
  const changeTimer = () => {
    setCurrentPreset((prev) => (prev === preset1 ? preset2 : preset1));
    
    timerRef.current.resetTimer();  // Call resetTimer function from Timer
    
  };

  const setPreset1 = () => {
    setCurrentPreset(preset1);
    timerRef.current.resetTimer();
  };

  const setPreset2 = () => {
    setCurrentPreset(preset2);
    timerRef.current.resetTimer();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, padding: 16}}>
      <View style={{ flex: 1 }}>
        <Appbar.Header mode="small" style={{width: '100%'}}>
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

        

        <Card style={{ marginTop: 16, width: '100%', alignItems: 'center'}}>
          <Card.Title title="Preset 1"/>
          <Card.Content>
            <Text>Amount of flags: {preset1.amountOfFlags}</Text>
            <Text>Klassenvlag: {preset1.firstFlag}</Text>
            <Text>First time: {preset1.firstTime}</Text>
            <Text>Second flag: {preset1.secondFlag}</Text>
            <Text>Second Time: {preset1.secondTime}</Text>
            <Text>Third flag: {preset1.thirdFlag}</Text>
            <Text>Third time: {preset1.thirdTime}</Text>
            <Button  mode="contained"  onPress={setPreset1} 
          style={{ marginTop: 16, marginLeft: 16, marginRight: 16, height: 50, width: 150 }}>
              Set preset
            </Button>
          </Card.Content>
        </Card>

        <Card style={{ marginTop: 16, width: '100%', alignItems: 'center'}}>
          <Card.Title title="Preset 2"/>
          <Card.Content>
            <Text>Amount of flags: {preset2.amountOfFlags}</Text>
            <Text>First flag: {preset2.firstFlag}</Text>
            <Text>First time: {preset2.firstTime}</Text>
            <Text>Second flag: {preset2.secondFlag}</Text>
            <Text>Second Time: {preset2.secondTime}</Text>
            <Text>Third flag: {preset2.thirdFlag}</Text>
            <Text>Third time: {preset2.thirdTime}</Text>
            <Button  mode="contained"  onPress={setPreset2} 
          style={{ marginTop: 16, marginLeft: 16, marginRight: 16, height: 50, width: 150 }}>
              Set preset
            </Button>
          </Card.Content>
        </Card>
        
      </View>
    </ScrollView>
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
