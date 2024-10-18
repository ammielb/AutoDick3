import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import {NavBar } from '@/components/NavBar';
import { Collapsible } from '@/components/default/Collapsible';
import { ExternalLink } from '@/components/default/ExternalLink';
import ParallaxScrollView from '@/components/default/ParallaxScrollView';
import { ThemedText } from '@/components/default/ThemedText';
import { ThemedView } from '@/components/default/ThemedView';

export default function TabTwoScreen() {
  return (

      <div>
        <NavBar/>
      </div >
        
    
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
