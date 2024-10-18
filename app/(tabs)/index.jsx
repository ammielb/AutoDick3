import React from 'react';
import { useRouter } from 'expo-router';
import { Appbar, Button, Text } from 'react-native-paper';
import { View } from 'react-native'; // Add a wrapper for the return content

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
    <View style={{flex: 1 }}>
      <Appbar.Header mode='small'>
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
      
      <Text variant="headlineMedium" style={{textAlign: 'center'}}>Timer: {currTime}</Text>
    </View>
  );
}
