import * as React from 'react';
import { useRouter } from 'expo-router';
import { Appbar, Button, Headline, Text } from 'react-native-paper';


const Presets = () => {
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
    <Appbar.Header>
      <Appbar.Content title="AutoDick"/>
      <Text>{currTime}</Text>
      <Button mode="contained" style={{marginRight: 16, marginLeft: 16, width: 96}} onPress={() => router.replace('./../')}>Home</Button>
    </Appbar.Header>
  );
}

export default Presets