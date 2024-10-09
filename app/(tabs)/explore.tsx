<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const Timer = () => {
  const [seconds, setSeconds] = useState(10);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    } else if(seconds == 0){
      console.log("klaar");
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(10);
  };
=======
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import {NavBar } from '@/components/navigation/NavBar';
import { Collapsible } from '@/components/default/Collapsible';
import { ExternalLink } from '@/components/default/ExternalLink';
import ParallaxScrollView from '@/components/default/ParallaxScrollView';
import { ThemedText } from '@/components/default/ThemedText';
import { ThemedView } from '@/components/default/ThemedView';
>>>>>>> 533c3f6 (added NavBar and test Suite for NavBar also put the components you get when starting in a diffrent folder)

  return (
<<<<<<< HEAD
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text variant="headlineMedium">Timer: {seconds}s</Text>
      <Button mode="contained" onPress={() => setIsActive(!isActive)}>
        {isActive ? 'Pause' : 'Start'}
      </Button>
      <Button mode="outlined" onPress={resetTimer} style={{ marginTop: 10 }}>
        Reset
      </Button>
    </View>
=======

      <div>
        <NavBar/>
      </div >
        
    
>>>>>>> 533c3f6 (added NavBar and test Suite for NavBar also put the components you get when starting in a diffrent folder)
  );
};

export default Timer;
