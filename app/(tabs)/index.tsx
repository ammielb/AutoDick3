// HomeScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Appbar, Button, Divider, Text } from 'react-native-paper';
import Timer from '@/components/Timer';
import DeviceModal from '@/components/DeviceConnectionModal';
import { downloadCSV } from './csvWriting';
// import useBLE from './useBLE';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  Card } from 'react-native-paper';

import { ScrollView } from 'react-native';

interface flags{
  notification:String,
  time:number
}
interface JsonData{
  amountOfFlags: number;
  flags: flags[],
  start:String
}

const preset1: JsonData = {
  amountOfFlags: 4,
  flags: [
    {notification: 'klassenvlag hijsen',time: 60},
    {notification: 'Straf vlag hijsen',time: 180},
    {notification: 'Straf vlag strijken',time: 60},
    {notification: 'Klassenvlag strijken' ,time: 60},
  ],
  start: 'start'
};
const preset2: JsonData = {
  amountOfFlags: 4,
  flags: [
    {notification: 'klassenvlag hijsen',time: 60},
    {notification: 'Straf vlag hijsen',time: 60},
    {notification: 'Straf vlag strijken',time: 60},
    {notification: 'Klassenvlag strijken' ,time: 1},
  ],
  start: 'start'
};




export default function HomeScreen() {
  const router = useRouter();
  const timerRef = useRef<any>(null);  // Create a ref to access Timer component

  const [currTime, setCurrTime] = useState<string>(new Date().toLocaleTimeString());
  const [currentPreset, setCurrentPreset] = useState<JsonData>(preset1);
  const [isDeviceTabVisible, setIsDeviceTabVisible] = useState<boolean>(false);

  // // Destructure values from useBLE and define types explicitly
  




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
    <ScrollView >





      {/*  alert do not use <br/> bc react native does not support this */}

      {/* preset lists */}
        <Card style={{ marginTop: 16, width: '100%', alignItems: 'center'}}>
          <Card.Title title="Preset 1"/>
          <Card.Content>
            <Text>5: {preset1.flags[0].notification.toString()}.</Text>
            <Text>   Tijd tot straf vlag {preset1.flags[0].time/60} minuten.</Text>
            {/* <br/> */}
            <Text>{"\n"}</Text>
            <Text>4: {preset1.flags[1].notification.toString()}.</Text>
            <Text>   Tijd tot straf vlag omlaag: {preset1.flags[0].time/60} minuten.</Text>
            {/* <br/> */}
            <Text>{"\n"}</Text>
            <Text>1: {preset1.flags[2].notification.toString()}.</Text>
            <Text>   Tijd tot start: {preset1.flags[0].time/60} minuut.</Text>
            {/* <br/> */}
            <Text>{"\n"}</Text>
            <Text>0: {preset1.flags[3].notification.toString()}.</Text>
            <Text>   Start.</Text>

            {/* button to change tthe preset for timer */}
            <Button  mode="contained"  onPress={setPreset1} 
          style={{ marginTop: 16, marginLeft: 16, marginRight: 16, height: 50, width: 150 }}>
              Set preset
            </Button>
          </Card.Content>
        </Card>

        <Card style={{ marginTop: 16, width: '100%', alignItems: 'center'}}>
          <Card.Title title="Preset 1"/>
          <Card.Content>
            <Text>4: {preset2.flags[0].notification.toString()}.</Text>
            <Text>   Tijd tot straf vlag {preset2.flags[0].time/60} minuten.</Text>
            {/* <br/> */}
            <Text>{"\n"}</Text>
            <Text>3: {preset2.flags[1].notification.toString()}.</Text>
            <Text>   Tijd tot straf vlag omlaag: {preset2.flags[0].time/60} minuten.</Text>
            {/* <br/> */}
            <Text>{"\n"}</Text>
            <Text>1: {preset2.flags[2].notification.toString()}.</Text>
            <Text>   Tijd tot start: {preset2.flags[0].time/60} minuut.</Text>
            {/* <br/> */}
            <Text>{"\n"}</Text>
            <Text>0: {preset2.flags[3].notification.toString()}.</Text>
            <Text>   Start.</Text>

            {/* button to change tthe preset for timer */}
            <Button  mode="contained"  onPress={setPreset2} 
          style={{ marginTop: 16, marginLeft: 16, marginRight: 16, height: 50, width: 150 }}>
              Set preset
            </Button>
            <Button mode="contained" onPress={setPreset1}
        style={{ marginTop: 16, marginLeft: 16, marginRight: 16, height: 50, width: 150 }}>
            Move pages
        </Button>
          </Card.Content>
        </Card>
        
        
 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },


  ctaButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  labelText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    alignSelf:'center',
  },
});