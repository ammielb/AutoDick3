import * as React from 'react';
import { useRouter } from 'expo-router';
import { Appbar, Button, Headline, Text } from 'react-native-paper';
import {View} from 'react-native';


const Presets = () => {
  const router = useRouter();
  const [currTime, setCurrTime] = React.useState(new Date().toLocaleTimeString());
  let vlaggen = []

  // useEffect to update the time every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date().toLocaleTimeString());
    }, 1000); // update every 1 second

    return () => clearInterval(interval); // cleanup interval on component unmount
  }, []);

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Content title="AutoDick"/>
        <Text>{currTime}</Text>
        <Button mode="contained" style={{marginRight: 16, marginLeft: 16, width: 96}} onPress={() => router.replace('./../')}>Home</Button>
      </Appbar.Header>

      <Button mode="contained" onPress={()=> vlaggen = ["papa", "Opa", "geel"] }>hoeren knop</Button>
      <Button mode="contained" onPress={() => localStorage.setItem('vlaggen', vlaggen)} >save preset</Button>
    </View>
  );
}

export default Presets