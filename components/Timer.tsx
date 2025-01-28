import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CountdownCircleTimer, TimeProps } from 'react-native-countdown-circle-timer';
import { Card } from 'react-native-paper';
import useBLE from '../app/(tabs)/useBLE';
import {Device} from "react-native-ble-plx";
interface flags{
  notification:String,
  time:number
}
export type Props = {
data:{
  // name: String,
  amountOfFlags: number,
  // klassenvlag: String,
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
  const [    currentFlag, setCurrentFlag ] = useState<string>(data.flags[0].notification.toString());
  const [ nextFlag, setNextFlag] = useState<string>(data.flags[1].notification.toString());
  const [timesRun, setTimesRun] = useState<number>(0);
  const [amountOfFlags] = useState<number>(data.amountOfFlags);
  


  const {
    writeToDevice
  } = useBLE();

  const startTimer = () => {
    setIsPlaying(true);
  };

  const pauseTimer = () => {
    setIsPlaying(false);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setTime((prevTime) => prevTime + 1); // Update key to reset timer
    setDuration(data.flags[0].time); // Reset to initial time
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

  const notificationCountdown = (serieCode : number, remainingTime: number, heisen: number) =>{
    //  check if the remaing time is 60 50 40 30 20 or 10 seconds

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

        // voor de klassen vlag 
        case 0:
          notificationCountdown(2, remainingTime , 1);
          break;

        //voor de procedure vlag
        case 1:
          notificationCountdown(3, remainingTime, 1);
          break;

          // procedure vlag gaat in
        case 2:
          notificationCountdown(3, remainingTime, 0);
          break;

          //start van race
        case 3:
          notificationCountdown(2, remainingTime, 0);
          break;
        
        //na de klassen en voor de proceduren vlag 
      }

  }


  const handleComplete = () => {
    setTimesRun((prev) => prev +1);
    
    if(timesRun < amountOfFlags - 1){
      let currentFlag, duration, nextFlag;


      // check if there is a flag available
      // 
      // 
      if(data.flags[timesRun+1] != undefined){
        currentFlag = data.flags[timesRun+1].notification.toString();
        duration=data.flags[timesRun+1].time;
      }else{
        currentFlag = " "
        duration=0;
      }
      
      if (data.flags[timesRun+2] != undefined){
        nextFlag = data.flags[timesRun+2].notification.toString()
      }else{
        nextFlag=" ";
      }
    
      setCurrentFlag(currentFlag); 
      setNextFlag(nextFlag); 
      setDuration(duration);


      setTime((prevtime)=> prevtime + 1);
      return{ shouldRepeat: true};
    }
    return { shouldRepeat: false };
  };

 
 

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text style={styles.labelText}>Nu: {currentFlag}</Text>
        <Text style={styles.flagText}>Volgende: {nextFlag}</Text>
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
      
      <Card.Actions>
        <View style={styles.buttonContainer}>
          <Button title="Start" onPress={startTimer} />
          <Button title="Pause" onPress={pauseTimer} />
          <Button title="Add 5 min" onPress={add5min} />
          <Button title="reset" onPress={resetTimer} />
          <Button title="testing" onPress={()=>
            {
              try {
                notificationCountdown(2, 30 , 1);
              }catch(e){}
            }
          } />
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