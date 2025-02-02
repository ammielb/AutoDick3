
import { Stack } from 'expo-router'; // Stack from Expo Router
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

      </Stack>
  );
}
