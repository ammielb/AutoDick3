/* eslint-disable no-bitwise */
import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { Buffer } from 'buffer';
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";

import * as ExpoDevice from "expo-device";
// import { base64} from "react-native-base64"
// import base64 from "react-native-base64";
import { btoa, atob } from 'react-native-quick-base64'


const SERVICE_UUID   =     "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
const CHARACTERISTIC_UUID ="beb5483e-36e1-4688-b7f5-ea07361b26a8"

interface BluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  scanForPeripherals(): void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  heartRate: number;
}

function useBLE(): BluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [heartRate, setHeartRate] = useState<number>(0);
  const [writeInterval, setWriteInterval] = useState<NodeJS.Timeout | null>(null);
  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };


  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      // console.log(device);
      // console.log(device);
      // console.log(device);
      if (error) {
        console.log(error);
      }


      if (device && device.name?.includes("Long name works now")) {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicateDevice(prevState, device)) {
            // console.log('asdasd')
            return [...prevState, device];
          }
          // console.log('asdasd')
          return prevState;
        });
      }
    });

    const connectToDevice = async (device: Device) => {
      try {
        const deviceConnection = await bleManager.connectToDevice(device.id);
        setConnectedDevice(deviceConnection);
        await deviceConnection.discoverAllServicesAndCharacteristics();
        bleManager.stopDeviceScan();
        startStreamingData(deviceConnection);
  
        // Start sending data repeatedly every 2 seconds
        const intervalId = setInterval(() => {
          writeToDevice(deviceConnection, "1");
        }, 2000); // adjust the interval time as needed
        setWriteInterval(intervalId);
      } catch (e) {
        console.log("FAILED TO CONNECT", e);
      }
    };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setHeartRate(0);
    }
  };

  const onHeartRateUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null
  ) => {
    if (error) {
      console.error(error);
      return -1;
    }
  
    if (!characteristic?.value) {
      console.log("No data was received");
      return -1;
    }
  
    const rawData = Buffer.from(characteristic.value, 'base64'); // Use Buffer to handle Base64 encoding
    let heartRateValue: number = -1;
  
    const firstBitValue: number = rawData[0] & 0x01;
  
    if (firstBitValue === 0) {
      heartRateValue = rawData[1];
    } else {
      heartRateValue = (rawData[1] << 8) + rawData[2];
    }
  
    setHeartRate(heartRateValue);
  };
  
  const writeToDevice = async (device: Device, data: string): Promise<void> => {
    // Encode the data to Base64
    const base64Data = Buffer.from(data).toString('base64');
  
    try {
      await device.writeCharacteristicWithoutResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        base64Data
      );
      console.log("Data written successfully:", data);
    } catch (e) {
      console.log("Write error:", e);
    }
  };


  const startStreamingData = async (device: Device) => {
    if (device) {
      device.monitorCharacteristicForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID ,
        onHeartRateUpdate
      );
    } else {
      console.log("No Device Connected");
    }
  };

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    heartRate,
  };
}

export default useBLE;