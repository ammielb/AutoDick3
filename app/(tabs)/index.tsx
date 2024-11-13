import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Appbar, Button, Text } from 'react-native-paper';
import Timer from '@/components/Timer';
import DeviceModal from '@/components/DeviceConnectionModal';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
// import useBLE from './useBLE';
import AsyncStorage from '@react-native-async-storage/async-storage';



// Define the structure of jsonData with an interface
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

const preset2 : JsonData ={
  amountOfFlags: 2,
  firstFlag: 'preset 2',
  firstTime: 4,
  secondFlag: 'flag 2 final flag',
  secondTime: 6,
  thirdFlag: 'no third flag',
  thirdTime: 13,
}

export default function HomeScreen() {
  const router = useRouter();
  const [currTime, setCurrTime] = useState<string>(new Date().toLocaleTimeString());
  const [curText, setCurText] = useState<string>("null");
  const [currentPreset, setCurrentPreset] = useState<JsonData>(jsonData);
  const [resetKey, setResetKey] = useState<boolean>(false);

  const changeTimer = ()=>{
    setCurrentPreset((prev)=> (prev === jsonData ? preset2 : jsonData));
    
}

const resetTimer = () =>{
 if(1===1) console.log("true");
}
  
  // useEffect to update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date().toLocaleTimeString());
    }, 1000); // update every 1 second

    return () => clearInterval(interval); // cleanup interval on component unmount
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="small">
        <Appbar.Content title="AutoDick" />
        <Text style={{ color: 'black', marginLeft: 8, justifyContent: 'center' }}>{currTime}</Text>
        <Button 
          mode="contained" 
          onPress={() => router.replace('./Presets')} 
          style={{ marginLeft: 16, marginRight: 16 }}
        >
          Presets
        </Button>
      </Appbar.Header>
      <Timer data={currentPreset} />
      <Text>{curText}</Text>
      <Button 
          mode="contained" 
          onPress={() => {changeTimer(); resetTimer()}} 
          style={{ marginLeft: 16, marginRight: 16, height: 50 }}
        > change preset</Button>
      {/* <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      /> */}
    </View>
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
});
