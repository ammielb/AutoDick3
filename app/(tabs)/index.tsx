
import React from 'react';
import { useRouter } from 'expo-router';
import { Appbar, Button} from 'react-native-paper';
import { Text } from 'react-native-paper';
import Timer  from '@/components/Timer';

export default function HomeScreen() {
  const router = useRouter();
  const [currTime, setCurrTime] = React.useState(new Date().toLocaleTimeString());

  // useEffect to update the time every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date().toLocaleTimeString());
    }, 1000); // update every 1 second

    return () => clearInterval(interval); // cleanup interval on component unmount
  }, []);
  return (
<div>
    <Appbar.Header mode='small'>
      <Appbar.Content title="AutoDick" />
      <Text style={{ color: 'black', marginLeft: 8,  justifyContent: 'center' }}>{currTime}</Text>
      <Button mode="contained" onPress={() => router.push('./Presets') } style={{ marginLeft: 16, marginRight: 16}}>Presets</Button>
      {/* <Button mode="contained" buttonColor='blue'  onPress={() =>  router.push('index')} style={{ marginLeft: 16}}> Home</Button> */}
      
    </Appbar.Header>
    <Timer timeSet="123123"></Timer>
  </div>
  );
}
