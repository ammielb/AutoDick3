// HomeScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';

import Timer from '@/components/Timer';
import DeviceModal from '@/components/DeviceConnectionModal';
import useBLE from './useBLE';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView
} from 'react-native';
import { 
  Appbar, 
  Button, 
  Divider,
  Text,
  Card,
  RadioButton
 } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';



interface flags{
  notification:String,
  time:number
}
interface JsonData{
  name: String,
  amountOfFlags: number;
  klassenvlag: String,
  flags: flags[],
  start:String
}


const preset1: JsonData = {
  name : 'preset1',
  amountOfFlags: 4,
  klassenvlag: 'uniform',
  flags: [
    {notification: 'klassenvlag hijsen',time: 60},
    {notification: 'Uniform vlag hijsen',time: 180},
    {notification: 'Uniform vlag strijken',time: 60},
    {notification: 'Klassenvlag strijken' ,time: 60},
  ],
  start: 'start'
};
const preset2: JsonData = {
  name: 'preset2',
  amountOfFlags: 4,
  klassenvlag:'uniform',
  flags: [
    {notification: 'klassenvlag hijsen',time: 60},
    {notification: 'Uniform vlag hijsen',time: 60},
    {notification: 'Uniform vlag strijken',time: 60},
    {notification: 'Klassenvlag strijken' ,time: 1},
  ],
  start: 'start'
};



export default function HomeScreen() {
  const router = useRouter();
  const timerRef = useRef<any>(null);  // Create a ref to access Timer component
  const [flagPreset1, setFlagPreset1] = React.useState('Uniform');
  const [flagPreset2, setFlagPreset2] = React.useState('Uniform');
  const [currTime, setCurrTime] = useState<string>(new Date().toLocaleTimeString());
  const [currentPreset, setCurrentPreset] = useState<JsonData>(preset1);
  const [isDeviceTabVisible, setIsDeviceTabVisible] = useState<boolean>(false);

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


  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  const hideDeviceTab = () => {
    setIsDeviceTabVisible(false);
  };

  const openDeviceTab= async () => {
    await scanForDevices();
    setIsDeviceTabVisible(true);
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
    preset2.klassenvlag = flagPreset2;
    preset2.flags[1].notification = flagPreset2 + " hijsen";
    preset2.flags[2].notification = flagPreset2 + " strijken";
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
    {/*  bluetooth connection button*/}
    <Text  style={{ color: 'black', marginLeft: 8, justifyContent: 'center' }}>
          {connectedDevice ? "connected to "+ connectedDevice.name : "Connect to a Bluetooth device"}
      </Text>

       <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openDeviceTab}
        style={styles.Button}
      >
        <Text style={styles.ButtonText}>
          {connectedDevice ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>


{/* tab to show the available bluetotoh devices */}
      <DeviceModal
        closeModal={hideDeviceTab}
        visible={isDeviceTabVisible}
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
      {/* timer */}
      <Text style={styles.presetText}>
            {currentPreset.name ==undefined ? "Geen preset geselecteerd." : "De huidige Preset is: " + currentPreset.name+"."}
        </Text>
      <Timer ref={timerRef}  data={currentPreset} connectedDevice={connectedDevice}/>  

      <Divider/>
      {/*  toeter BZZZZZ */}
      {/* if there is a BL devices connected display action keys for BL  */}
        {connectedDevice  && (
          <View style={{display:'flex', justifyContent:'space-between' ,flexDirection:'row'}} >

          <Button 
          mode="contained" 
          onPress={()=>
            {
              try {
                writeToDevice(connectedDevice, "02");
              }catch(e){}
            }
          } 
          style={{ marginLeft: 16, marginRight: 16 }}
        >
          long Press
        </Button>

  
        <Button 
          mode="contained" 
          onPress={()=>
            {
              try {
                writeToDevice(connectedDevice, "01");
              }catch(e){}
            }
          } 
          style={{ marginLeft: 16, marginRight: 16 }}
        >
         short Press
        </Button>
          
    </View>
  )}
  <Divider/>
  




      {/*  alert do not use <br/> bc react native does not support this */}

      {/* preset lists */}
      <Card style={styles.card}>
        <Card.Title  style={styles.cardTitle} title="Preset 1" />
        <Card.Content>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text>5: {preset1.flags[0].notification.toString()}.</Text>
              <Text>   Tijd tot straf vlag {preset1.flags[0].time / 60} minuten.</Text>
              <Text>{"\n"}</Text>
              <Text>   Tijd tot straf vlag omlaag:</Text> 
              <Text>{preset1.flags[0].time / 60} minuten.</Text> 
              <Text>{"\n"}</Text>
              <Text>1: {preset1.flags[2].notification.toString()}.</Text>
              <Text>   Tijd tot start: {preset1.flags[0].time / 60} minuut.</Text>
              <Text>{"\n"}</Text>
              <Text>0: {preset1.flags[3].notification.toString()}.</Text>
              <Text>   Start.</Text>
            </View>
            <View>
              <Text>{"Selecteer een straf vlag"}</Text>

              <RadioButton.Group onValueChange={newValue => {
                  setFlagPreset1(newValue)
                  preset1.klassenvlag = flagPreset1;
                  preset1.flags[1].notification = flagPreset1 + " hijsen";
                  preset1.flags[2].notification = flagPreset1 + " strijken";
                }} value={flagPreset1}
                >
                <View style={styles.RadioButtonItem}>
                  <RadioButton
                    value="Uniform"
                    status={flagPreset1 === 'Uniform' ? 'checked' : 'unchecked'}
                  />
                  <Text>uniform</Text>
                </View>
                <View style={styles.RadioButtonItem}>
                  <RadioButton.Android
                    value="Zwart"
                    status={flagPreset1 === 'Zwart' ? 'checked' : 'unchecked'}
                  />
                  <Text>Zwart</Text>
                </View>
                <View style={styles.RadioButtonItem}>
                  <RadioButton.Android
                    value="Papa"
                    status={flagPreset1 === 'Papa' ? 'checked' : 'unchecked'}
                  />
                  <Text>Papa</Text>
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <Button mode="contained" onPress={setPreset1} style={styles.Button}>
            <Text style={styles.ButtonText}>Set preset</Text>
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title style={styles.cardTitle} title="Preset 2" />
        <Card.Content>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text>4: {preset2.flags[0].notification.toString()}.</Text>
              <Text>   Tijd tot straf vlag {preset2.flags[0].time / 60} minuten.</Text>
              <Text>{"\n"}</Text>
              <Text>3: {preset2.flags[1].notification.toString()}.</Text>
              <Text>   Tijd tot straf vlag omlaag:</Text> 
              <Text>{preset2.flags[0].time / 60} minuten.</Text> 
              <Text>{"\n"}</Text>
              <Text>1: {preset2.flags[2].notification.toString()}.</Text>
              <Text>   Tijd tot start: {preset2.flags[0].time / 60} minuut.</Text>
              <Text>{"\n"}</Text>
              <Text>0: {preset2.flags[3].notification.toString()}.</Text>
              <Text>   Start.</Text>
            </View>
            <View>
              <Text>{"Selecteer een straf vlag"}</Text>
              <RadioButton.Group onValueChange={newValue => {
                  setFlagPreset2(newValue)
                  preset2.klassenvlag = flagPreset1;
                  preset2.flags[1].notification = flagPreset2 + " hijsen";
                  preset2.flags[2].notification = flagPreset2 + " strijken";
                }} value={flagPreset2}  >
                <View style={styles.RadioButtonItem}>
                  <RadioButton
                    value="Uniform"
                    status={flagPreset2 === 'Uniform' ? 'checked' : 'unchecked'}
                  />
                  <Text>uniform</Text>
                </View>
                <View style={styles.RadioButtonItem}>
                  <RadioButton.Android
                    value="Zwart"
                    status={flagPreset2 === 'Zwart' ? 'checked' : 'unchecked'}
                  />
                  <Text>Zwart</Text>
                </View>
                <View style={styles.RadioButtonItem}>
                  <RadioButton.Android
                    value="Papa"
                    status={flagPreset2 === 'Papa' ? 'checked' : 'unchecked'}
                  />
                  <Text>Papa</Text>
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <Button mode="contained" onPress={setPreset2} style={styles.Button}>
            <Text style={styles.ButtonText}>Set preset</Text>
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
  scrollView: {
    flexGrow: 1,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ebebeb'
  },
    Button: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
    width: "100%",
    textAlign: "center",
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    width: "100%",
    // marginLeft:20,
  },
  labelText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    alignSelf:'center',
  },
  presetText: {
    fontSize: 20,
    fontWeight: '200',
    marginBottom: 10,
    alignSelf:'center',
  },
  RadioButtonItem:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf:'center',
    textAlign: 'center',
  },
  card: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  column: {
    // flexDirection: 'collumn',
    justifyContent: 'center',
  },
});