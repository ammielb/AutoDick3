
import { Stack } from 'expo-router'; // Stack from Expo Router
// import NavBar  from '@components/NavBar';
import { NavigationContainer } from '@react-navigation/native';
import {NavBar } from '@/components/NavBar';

export default function Layout() {
  return (
    <Stack
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <NavBar/>,
        }}>
      {/* Automatically maps to app/index.jsx */}
      <Stack.Screen name="index" options={{ title: 'index' }} />

      {/* Automatically maps to app/Presets.jsx */}
      <Stack.Screen name="Presets" options={{ title: 'Presets' }} />

      <Stack.Screen name="csvWriting" options={{ title: 'csvWriting'}} />

      </Stack>
  );
}
