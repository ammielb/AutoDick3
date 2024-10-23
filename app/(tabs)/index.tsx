
import React from 'react';
// import StyleSheet from 'react-native';
import Timer  from '@/components/Timer';


export default function HomeScreen() {

  return (
<div>
    <Timer timeSet={133}></Timer>

  </div>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     marginTop: 25,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     width:'80%'
//   },
//   timeText: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     marginTop: 25,
//     display: 'flex',
//     flexDirection:"row",
//     justifyContent: 'space-between',
//     width: '100%',
//   },
// });