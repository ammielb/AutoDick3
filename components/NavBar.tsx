import * as React from 'react';
import { useRouter, useSegments } from 'expo-router';
import { Appbar, Button } from 'react-native-paper';
import { Text } from 'react-native-paper';

export function NavBar() {
  const router = useRouter();
  const segments = useSegments();
  const [currTime, setCurrTime] = React.useState(new Date().toLocaleTimeString());

  // useEffect to update the time every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date().toLocaleTimeString());
    }, 1000); // update every 1 second

    return () => clearInterval(interval); // cleanup interval on component unmount
  }, []);

  // Check if we are on the "Home" screen (index) or "Presets" screen
  // const isHomeScreen = segments.includes('index');
  const isPresetsScreen = segments.includes("Presets");
  console.log(isPresetsScreen)

  return (
    <Appbar.Header style={{ display: 'flex', justifyContent: 'center' }} mode="small">
      <Text style={{ color: 'black' }}>{currTime}</Text>
      <Appbar.Content titleStyle={{ textAlign: 'center' }} title="AutoDick" />


        <Button mode="contained" onPress={ (isPresetsScreen) ? ()=>{ router.replace('./') }: ()=>{ router.replace('./Presets') } } style={{ marginLeft: 16, marginRight: 16 }}>
          Presets
        </Button>





    </Appbar.Header>
  );
}