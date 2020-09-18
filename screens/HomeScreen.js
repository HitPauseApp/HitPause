import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import TipOTD from '../components/TipOTD';
import WelcomeBanner from '../components/WelcomeBanner';
import { LinearGradient } from 'expo-linear-gradient';


export default function HomeScreen() {

  const TOTD = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar pellentesque ex at maximus. Nam feugiat rhoncus accumsan. ';
  const NAME = 'Will Newcomb';

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#EE0979', '#6E00DD']}
        style={styles.gradient}
      />
      <Text style={styles.header}>HitPause</Text>
      <WelcomeBanner NAME={NAME}></WelcomeBanner>
      <ScrollView></ScrollView>
      <TipOTD TOTD={TOTD}></TipOTD>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#341931'
  },
  header:{
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
    
  },
  gradient: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -1,
  },
});
