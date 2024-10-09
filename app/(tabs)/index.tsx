
import {AppBar} from '@mui/material/'; 
import {Toolbar} from '@mui/material/'; 
import {Box} from '@mui/material/'; 
// import { ThemedText } from '@/components/ThemedText';
import {NavBar } from '@/components/navigation/NavBar';

import { StyleSheet, Platform } from 'react-native';


export default function HomeScreen() {
  return (
    <div>
      <NavBar/>

      
    </div>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
