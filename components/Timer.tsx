import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CountdownCircleTimer, TimeProps } from 'react-native-countdown-circle-timer';
import { Card } from 'react-native-paper';
import SoundPlayer from 'react-native-sound-player';



export type Props = {
  data: {
    amountOfFlags: number;
    firstFlag: string;
    firstTime: number;
    secondFlag: string;
    secondTime: number;
    thirdFlag: string;
    thirdTime: number;
  }
  
};


const Timer: React.FC<Props> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0); // Key to reset the timer
  const [duration, setDuration] = useState<number>(data.firstTime); // Start with initial time
  const [label] = useState<string>("Now: " );
  const [flag] = useState<string>("Next: " );
  const [timerCounter, setTimerCounter] = useState<number>(1);
  const [ currentFlag, setCurrentFlag ] = useState<string>(data.firstFlag);
  const [ nextFlag, setNextFlag] = useState<string>(data.secondFlag);
  const [timesRun, setTimesRun] = useState<number>(0);
  const [amountOfFlags] = useState<number>(data.amountOfFlags);
  

  const startTimer = () => {
    setIsPlaying(true);
  };

  const pauseTimer = () => {
    setIsPlaying(false);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setTime((prevTime) => prevTime + 1); // Update key to reset timer
    setDuration(data.firstTime); // Reset to initial time
    setTimesRun(0);
    setCurrentFlag(data.firstFlag);
    setNextFlag(data.secondFlag);
    setTimerCounter(0);
  };

  // useImperativeHandle(ref, () => ({
  //   resetTimer
  // }));

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
    console.log("komt voor de if statement");
    console.log(timesRun);
    setTimesRun((prev) => prev +1);
    if(timesRun < amountOfFlags - 1){
      console.log("komt in if statement");
      console.log(timesRun);
      switch(timesRun){
        case 0:
          setCurrentFlag(data.secondFlag);
          setNextFlag(data.thirdFlag);
          setDuration(data.secondTime);
          break;
        case 1:
          console.log("case 1");
          setCurrentFlag(data.thirdFlag);
          setNextFlag("None");
          setDuration(data.thirdTime);
          break;
        case 2:
          console.log("case 2");
          setCurrentFlag("klaar");
          setNextFlag(" ");
          setDuration(data.thirdTime);
          break;
        case 3:
          console.log("case 3");
          setCurrentFlag("te vaak");
          break;
        default:
          console.log("defualt");
          break;
      }
      console.log("komt uit case");
      console.log(timesRun);
      setTime((prevtime)=> prevtime + 1);
      return{ shouldRepeat: true};
    }
    return { shouldRepeat: false };
  };

 
 

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text style={styles.labelText}>Now: {currentFlag}</Text>
        <Text style={styles.flagText}>Next: {nextFlag}</Text>
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
// export { resetTimer };
