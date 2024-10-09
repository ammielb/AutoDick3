<<<<<<< HEAD
import { Stack } from 'expo-router'; // Stack from Expo Router
=======
import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { NavBar } from '@/components/navigation/NavBar';

export default function TabLayout() {
  const colorScheme = useColorScheme();
>>>>>>> 533c3f6 (added NavBar and test Suite for NavBar also put the components you get when starting in a diffrent folder)

export default function Layout() {
  return (
<<<<<<< HEAD
    <Stack>
      {/* Automatically maps to app/index.jsx */}
      {/* <Stack.Screen name="index" options={{ title: 'index' }} /> */}

      {/* Automatically maps to app/other.jsx */}
      {/* <Stack.Screen name="Presets" options={{ title: 'Presets' }} /> */}
    </Stack>
=======

    // <NavBar></NavBar>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
>>>>>>> 533c3f6 (added NavBar and test Suite for NavBar also put the components you get when starting in a diffrent folder)
  );
}
