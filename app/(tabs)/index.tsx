// HomeScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Appbar, Button, Divider, Text } from 'react-native-paper';
import Timer from '@/components/Timer';
import DeviceModal from '@/components/DeviceConnectionModal';
import useBLE from './useBLE';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable
} from 'react-native';
// import useBLE from './useBLE';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  Card } from 'react-native-paper';

import { ScrollView } from 'react-native';

interface JsonData {
  amountOfFlags: number;
  firstFlag: string;
  firstTime: number;
  secondFlag: string;
  secondTime: number;
  thirdFlag: string;
  thirdTime: number;
  fourthFlag: string;
  fourthTime: number;
  start: string;
}

const preset1: JsonData = {
  amountOfFlags: 5,
  firstFlag: 'klassenvlag hijsen',
  firstTime: 60,
  secondFlag: 'Straf vlag hijsen',
  secondTime: 60,
  thirdFlag: 'Straf vlag strijken',
  thirdTime: 60,
  fourthFlag: 'Klassenvlag strijken',
  fourthTime: 1,
  start: 'start'
};

const preset2: JsonData = {
  amountOfFlags: 2,
  firstFlag: 'klassenvlag hijsen',
  firstTime: 60,
  secondFlag: 'Straf vlag hijsen',
  secondTime: 60,
  thirdFlag: 'Straf vlag strijken',
  thirdTime: 60,
  fourthFlag: 'Klassenvlag strijken',
  fourthTime: 60,
  start: 'Start'
};

export default function HomeScreen() {
  const router = useRouter();
  const timerRef = useRef<any>(null);  // Create a ref to access Timer component

  const [currTime, setCurrTime] = useState<string>(new Date().toLocaleTimeString());
  const [currentPreset, setCurrentPreset] = useState<JsonData>(preset1);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // // Destructure values from useBLE and define types explicitly
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    writeToDevice
  } = useBLE();


  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    await scanForDevices();
    setIsModalVisible(true);
  };

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

      {/* timer */}
      <Timer ref={timerRef} data={currentPreset} />  {/* Pass ref to Timer */}

      <Divider/>
      {/*  toeter BZZZZZ */}

        {connectedDevice  && (
        <View style={{backgroundColor: 'blue', flex: 0.2}} >
      
          <Button 
          mode="contained" 
          onPress={()=>
            {
              try {
                writeToDevice(connectedDevice, "1");
              }catch(e){}
            }
          } 
          style={{ marginLeft: 16, marginRight: 16 }}
        >
          send 1
        </Button>

        <Button 
          mode="contained" 
          onPress={()=>
            {
              try {
                writeToDevice(connectedDevice, "1");
              }catch(e){}
            }
          } 
          style={{ marginLeft: 16, marginRight: 16 }}
        >
          send 1
        </Button>
          
    </View>
  )}
  <Divider/>
      {/*  bluetooth connection button*/}
      <Text  style={{ color: 'black', marginLeft: 8, justifyContent: 'center' }}>
          {connectedDevice ? "connected to "+ connectedDevice.name : "Connect to a Bluetooth device"}
      </Text>
       <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.ctaButton}
      >
        
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>

      <Pressable onPress={hideModal}>
        <Text>close</Text>
      </Pressable>

      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      /> 






        

        <Card style={{ marginTop: 16, width: '100%', alignItems: 'center'}}>
          <Card.Title title="Preset 1"/>
          <Card.Content>
            <Text>5: {preset1.firstFlag}.</Text>
            <Text>   Tijd tot straf vlag {preset1.firstTime/60} minuten.</Text>
            <br/>
            <Text>4: {preset1.secondFlag}.</Text>
            <Text>   Tijd tot straf vlag omlaag: {preset1.secondTime/60} minuten.</Text>
            <br/>
            <Text>1: {preset1.thirdFlag}.</Text>
            <Text>   Tijd tot start: {preset1.thirdTime/60} minuut.</Text>
            <br/>
            <Text>0: {preset1.fourthFlag}.</Text>
            <Text>   Start.</Text>
            <Button  mode="contained"  onPress={setPreset1} 
          style={{ marginTop: 16, marginLeft: 16, marginRight: 16, height: 50, width: 150 }}>
              Set preset
            </Button>
          </Card.Content>
        </Card>

        <Card style={{ marginTop: 16, width: '100%', alignItems: 'center'}}>
          <Card.Title title="Preset 2"/>
          <Card.Content>
            <Text>4: {preset2.firstFlag}.</Text>
            <Text>   Tijd tot strafvlag: {preset2.firstTime/60} minuut.</Text>
            <br/>
            <Text>3: {preset2.secondFlag}.</Text>
            <Text>   Tijd tot straf vlag omlaag: {preset2.secondTime/60} minuut.</Text>
            <br/>
            <Text>2: {preset2.thirdFlag}.</Text>
            <Text>   Tijd tot klassenvlag omlaag: {preset2.thirdTime/60} minuut.</Text>
            <br/>
            <Text>1: {preset2.fourthFlag}.</Text>
            <Text>   Tijd tot start: {preset2.fourthTime/60} minuut.</Text>
            <Button  mode="contained"  onPress={setPreset2} 
          style={{ marginTop: 16, marginLeft: 16, marginRight: 16, height: 50, width: 150 }}>
              Set preset
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
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
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
