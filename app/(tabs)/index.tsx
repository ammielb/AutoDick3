import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Appbar, Button, Divider, Text } from 'react-native-paper';
import Timer from '@/components/Timer';
import DeviceModal from '@/components/DeviceConnectionModal';
// import useBLE from './useBLE';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable
} from 'react-native';
import useBLE from './useBLE';
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
  firstFlag: 'klassen vlag omhoog',
  firstTime: 10,
  secondFlag: 'straf vlag omhoog',
  secondTime: 15,
  thirdFlag: 'nog 1 minuut voor start  en straf vlag omlaag',
  thirdTime: 5,
};

export default function HomeScreen() {
  const router = useRouter();
  const [currTime, setCurrTime] = useState<string>(new Date().toLocaleTimeString());
  const [usePreset, setUsePreset] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreset = async () => {
      try {
        const preset = await AsyncStorage.getItem('vlaggen');
        if (preset) setUsePreset(preset);
      } catch (error) {
        console.error("Failed to fetch preset:", error);
      }
    };
    fetchPreset();
  }, []);
  
  // Destructure values from useBLE and define types explicitly
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    writeToDevice
  } = useBLE();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

  // useEffect to update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date().toLocaleTimeString());
    }, 1000); // update every 1 second

    return () => clearInterval(interval); // cleanup interval on component unmount
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Divider/>
      {/* timer */}
      <Timer data={jsonData} />

      <Divider/>
      {/*  toeter BZZZZZ */}

        {connectedDevice  && (
        <View style={{display:'flex', justifyContent:'space-between' ,flexDirection:'row'}} >
      
          <Button 
          mode="contained" 
          onPress={()=>
            {
              try {
                writeToDevice(connectedDevice, "0");
              }catch(e){}
            }
          } 
          style={{ marginLeft: 16, marginRight: 16, width:'45%' }}
        >
          uit
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
          style={{ marginLeft: 16, marginRight: 16 , width:'45%' }}
        >
         aan 
        </Button>
          
    </View>
  )}
  <Divider/>
      {/*  bluetooth connection button*/}
      <Text style={styles.labelText}>
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


      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      /> 


            {/* only uncomment this if you want tot test the page without the bluetooth. because bluetooth only works if you build it into an APK and run it on your phone.*/}

      {/* <Text style={styles.labelText}>
          {"Connect to a Bluetooth device"}
      </Text>

      <TouchableOpacity
        onPress={()=>{}}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {"asdsadasd"}
        </Text>
      </TouchableOpacity>

      <DeviceModal
        closeModal={()=>{}}
        visible={false}
        connectToPeripheral={()=>{}}
        devices={[]}
      />  */}
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
  labelText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    alignSelf:'center',
  },
});