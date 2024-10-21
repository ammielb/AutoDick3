
import { Stack } from 'expo-router'; // Stack from Expo Router


export default function Layout() {
  return (
    <Stack>
      {/* Automatically maps to app/index.jsx */}
      {/* <Stack.Screen name="index" options={{ title: 'index' }} /> */}

      {/* Automatically maps to app/other.jsx */}
      {/* <Stack.Screen name="Presets" options={{ title: 'Presets' }} /> */}
    </Stack>
  );
}
