
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { TouchableOpacity } from 'react-native';
import { State } from 'react-native-gesture-handler';

import { TextInput } from 'react-native-paper';


export type Props = {
    timeSet: number;

  };

  // interface State  {
  //   time:number
  // }
  // let state  : State= {
  //   time: 0,
  // }
const  Timer : React.FC<Props> = ({timeSet})=>{
  const [time, setTime] = useState<number>(timeSet);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (isRunning && timerRef.current) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };








    



    
     
  
  
  
   
      

        return (
          <View style={styles.container}>
          <Text style={styles.timeText}>{formatTime(time)}</Text>
          <View style={styles.buttonContainer}>
            <Button title={'Start'} onPress={startTimer} />
            <Button title={'Stop' } onPress={ stopTimer } />
            <Button title="Reset" onPress={resetTimer} />
          </View>
        </View>
        );
}
const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
const styles = StyleSheet.create({
  container: {
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});


export default Timer;
