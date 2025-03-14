import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CountdownCircleTimer, TimeProps } from 'react-native-countdown-circle-timer';
import { Card } from 'react-native-paper';
import useBLE from '../app/(tabs)/useBLE';
import {Device} from "react-native-ble-plx";
import { appendToCSV } from '@/app/(tabs)/csvWriting';
interface flags{
  notification:String,
  time:number
}
export type Props = {
data:{
  amountOfFlags: number,
  flagSerieCode: number,
  flags: flags[],
  start:String
},
connectedDevice : Device | null
  
};



const Timer = forwardRef (({data, connectedDevice}: Props, ref) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0); // Key to reset the timer
  const [duration, setDuration] = useState<number>(data.flags[0].time); // Start with initial time
  const [label] = useState<string>("Now: " );
  const [flag] = useState<string>("Next: " );
  const [timerCounter, setTimerCounter] = useState<number>(1);
  const [currentFlag, setCurrentFlag ] = useState<string>(data.flags[0].notification.toString());
  const [nextFlag, setNextFlag] = useState<string>(data.flags[1].notification.toString());
  const [timesRun, setTimesRun] = useState<number>(0);
  const [amountOfFlags] = useState<number>(data.amountOfFlags);
  

  const {
    writeToDevice
  } = useBLE();

// 
// 
// all onclick functions for the buttons 
//   
//
  const startTimer = () => {
    appendToCSV("\n Start nieuwe race\n", "1");    // Write line to csv to indecate an new race starting
    setIsPlaying(true);
  };

  const pauseTimer = () => {
    setIsPlaying(false);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setTime((prevTime) => prevTime + 1); // Update key to reset timer
    setDuration(data.flags[0].time + 1); 
    setTimesRun(0);
    setCurrentFlag(data.flags[0].notification.toString());
    setNextFlag(data.flags[1].notification.toString());
    setTimerCounter(0);
  };

  useImperativeHandle(ref, () => ({
    resetTimer
  }));

  const add5min = () => {
    setDuration((prevDuration) => prevDuration + 300); // Add 5 minutes (300 seconds)
    setTime((prevTime) => prevTime + 1); // Reset key to apply new duration
  };

// 
//   
// displaying the time in the correct format
// 
//   
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

// 
// 
// handling the notifications, updating of the timer and when the timer is completed
// 
//
  const notificationCountdown = (serieCode : number, remainingTime: number, heisen: number) =>{
    //  check if the remaing time is 60, 55, 50, 45, 40, 35, 30, 25, 20, 15 10 or 0 seconds

      if(remainingTime % 5 == 0 ){
        let transmitData = serieCode + "" + remainingTime + "" +  heisen
        console.log(transmitData);
        if(connectedDevice != undefined){
          writeToDevice(connectedDevice,transmitData.toString());
        }
        
      }
  }
  const handleUpdate = (remainingTime: number) =>{
    

      if(remainingTime > 60){
         return;
      }
      switch(timesRun){

        // for raising class flag
        case 0:
          notificationCountdown(2, remainingTime , 1);
          break;

        // for raising procedure flag
        case 1:
          notificationCountdown(data.flagSerieCode + 4, remainingTime, 1);
          break;

        // lowering procedure flag
        case 2:
          notificationCountdown(data.flagSerieCode + 4, remainingTime, 0);
          break;

          //start of race
        case 3:
          notificationCountdown(2, remainingTime, 0);
          break;
      }

  }







  const handleComplete = () => {
    setTimesRun((prev) => prev +1);
    
    if(timesRun < amountOfFlags - 1){
      let currentFlag, duration, nextFlag;


      //  update the "now" text
      if(data.flags[timesRun+1] != undefined){
        currentFlag = data.flags[timesRun+1].notification.toString();
        appendToCSV(data.flags[timesRun].notification.toString(), "1");   // Write flag data to csv file (csvWriting)
        duration=data.flags[timesRun+1].time;
      }else{
        currentFlag = " "
        appendToCSV(currentFlag, "1");    // Write flag data to csv file (csvWriting)
        duration=0;
      }
      

      // updating the "next" text
      if (data.flags[timesRun+2] != undefined){
        nextFlag = data.flags[timesRun+2].notification.toString();
      }else{
        nextFlag="Start";
      }
    
      setCurrentFlag(currentFlag); 
      setNextFlag(nextFlag); 
      setDuration(duration);
      
      setTime((prevtime)=> prevtime + 1);
      return{ shouldRepeat: true};
    } else{
      let currentFlag
      currentFlag = "Start";
      setCurrentFlag(currentFlag);
      appendToCSV(data.flags[timesRun].notification.toString(), "1");
      appendToCSV(currentFlag, "1");    // Write flag data to csv file (csvWriting)
    }
    return { shouldRepeat: false };
  };

 
 

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text style={styles.labelText}>Na huidige timer: {currentFlag}</Text>
        <Text style={styles.flagText}>Daarna: {nextFlag}</Text>
        <CountdownCircleTimer
          key={time} // Key changes reset the timer
          duration={duration}
          colors="#0000ff"
          updateInterval={1}
          isPlaying={isPlaying}
          onUpdate={handleUpdate}
          onComplete={handleComplete} // Switch to the next duration on complete
        >
          
          {displayTime}
        </CountdownCircleTimer>
      </Card.Content>
      
      {/* displaying buttons */}
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
});

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