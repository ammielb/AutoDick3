
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
      connectToDevice,
      connectedDevice,
      heartRate,
      disconnectFromDevice,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
        {connectedDevice ? (
          <>
            {/* <PulseIndicator /> */}
            <Text style={styles.heartRateTitleText}>Your Heart Rate Is:</Text>
            <Text style={styles.heartRateText}>{heartRate} bpm</Text>
          </>
        ) : (
          <Text style={styles.heartRateTitleText}>
            Please Connect to a Heart Rate Monitor
          </Text>
        )}
      </View>
    <Timer timeSet={133}></Timer>
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
