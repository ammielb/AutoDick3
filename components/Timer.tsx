import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CountdownCircleTimer, TimeProps } from 'react-native-countdown-circle-timer';
import { Card } from 'react-native-paper';

export type Props = {
  initialTime: number;
  nextTime: number;
  vlaggen: string;
};

const Timer: React.FC<Props> = ({ initialTime, nextTime, vlaggen }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0); // Key to reset the timer
  const [duration, setDuration] = useState<number>(initialTime); // Start with initial time
  const [flags] = useState<string>(vlaggen);
  const [label, setLabel] = useState<string>("Now: " );
  const [flag, nextFlag] = useState<string>("Next: " );
  const [timerCounter, setTimerCounter] = useState<number>(1);
  

  const startTimer = () => {
    setIsPlaying(true);
  };

  const pauseTimer = () => {
    setIsPlaying(false);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setTime((prevTime) => prevTime + 1); // Update key to reset timer
    setDuration(initialTime); // Reset to initial time
    setTimerCounter(0);
  };

  const add5min = () => {
    setDuration((prevDuration) => prevDuration + 300); // Add 5 minutes (300 seconds)
    setTime((prevTime) => prevTime + 1); // Reset key to apply new duration
  };

  const formatTime = (remainingTime: number) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const displayTime = (displayedText: TimeProps) => {
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

  const handleComplete = () => {
    if (duration === initialTime) {
      // Switch to the next duration after the initial timer completes
      setDuration(nextTime);
      setTime((prevTime) => prevTime + 1); // Reset timer to trigger new duration
    } else {
      // Reset back to the initial duration if needed, or stop
      setIsPlaying(false); // Stops the timer after completing the second duration
      setLabel("Now: no flag");
      nextFlag(" ");
    }

    
    setTimerCounter((prevCounter) => (prevCounter + 1) % vlaggen.length);
    
    return { shouldRepeat: false };
  };


  const currentFlag = vlaggen[timerCounter];
  const setnextFlag = vlaggen[timerCounter + 1];

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text style={styles.labelText}>Now: {currentFlag}</Text>
        <Text style={styles.flagText}>Next: {setnextFlag}</Text>
        <CountdownCircleTimer
          key={time} // Key changes reset the timer
          duration={duration}
          colors="#0000ff"
          updateInterval={1}
          isPlaying={isPlaying}
          onComplete={handleComplete} // Switch to the next duration on complete
        >
          
          {displayTime}
        </CountdownCircleTimer>
      </Card.Content>
      
      <Card.Actions>
        <View style={styles.buttonContainer}>
          <Button title="Start" onPress={startTimer} />
          <Button title="Pause" onPress={pauseTimer} />
          <Button title="Add 5 min" onPress={add5min} />
          <Button title="reset" onPress={resetTimer} />
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
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  labelText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  flagText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10
  },
});

export default Timer;
