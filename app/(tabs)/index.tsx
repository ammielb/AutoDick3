
import React from "react";
import { useState } from "react";
// import StyleSheet from 'react-native';
import Timer  from '@/components/Timer';
import DeviceModal from "@/components/DeviceConnectionModal";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useBLE from "./useBLE";
// import { BleManager } from 'react-native-ble-plx';
export default function HomeScreen() {

    const {
      requestPermissions,
      scanForPeripherals,
      allDevices,
      // connectToDevice,
      // connectedDevice,
      // heartRate,
      // disconnectFromDevice,
    } = useBLE();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  
    const scanForDevices = async () => {
      const isPermissionsEnabled = await requestPermissions();
      // console.log(isPermissionsEnabled);
      // console.log("asdasdasd");
      console.log('asdasd')
      if (isPermissionsEnabled) {
        console.log('asdasdsadasd')
        scanForPeripherals();
        console.log(allDevices);
      }
    };
  
    const hideModal = () => {
      setIsModalVisible(false);
    };
  
    const openModal = async () => {
      scanForDevices();
      setIsModalVisible(true);
    };
  
  return (
    <SafeAreaView >
    <Timer timeSet={133}></Timer>
    <TouchableOpacity
        onPress={ openModal}
       
      >
        <Text >
          {"Connect"}
        </Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={() =>{}}
        devices={allDevices}
      />
    </SafeAreaView>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     marginTop: 25,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     width:'80%'
//   },
//   timeText: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     marginTop: 25,
//     display: 'flex',
//     flexDirection:"row",
//     justifyContent: 'space-between',
//     width: '100%',
//   },