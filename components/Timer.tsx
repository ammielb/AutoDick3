import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CountdownCircleTimer, TimeProps } from 'react-native-countdown-circle-timer';
import { Card } from 'react-native-paper';

export type Props = {
  timeSet: number;
};

const Timer: React.FC<Props> = ({ timeSet }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0); // time  to reset the timer

  const startTimer = () => {
    setIsPlaying(true);
  };

  const pauseTimer = () => {
    setIsPlaying(false);
  };

  const resetTimer = () => {
    setIsPlaying(false);
   setTime((prevTime) => prevTime + 1); // Change the time to reset the timer
  };


  const formatTime = (remainingTime: number) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds =remainingTime % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }


  const displayTime = (displayedText:TimeProps) => {
    return (
      <Text
        accessibilityRole="timer"
        accessibilityLiveRegion="assertive"
        importantForAccessibility="yes"
        style={styles.timeText}
      >
        {formatTime(displayedText.remainingTime)}
      </Text>
    );
  };


  //  the actual HTML of the component
  return (
    <Card style={styles.container}>
      <Card.Content>
      <CountdownCircleTimer
        key={time} // Key changes will reset the timer
        duration={timeSet}
        colors="#0000ff"
        updateInterval={1}
        isPlaying={isPlaying}
      >
        {displayTime }
      </CountdownCircleTimer>
      </Card.Content>
      
      <Card.Actions >
        <View style={styles.buttonContainer}>
        <Button title="Start" onPress={startTimer} />
        <Button title="Pause" onPress={pauseTimer} />
        <Button title="Reset" onPress={resetTimer} />
        </View>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // width:'80%'
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 25,
    display: 'flex',
    flexDirection:"row",
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Timer;