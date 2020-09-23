import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';

import TipOTD from '../components/TipOTD';
import WelcomeBanner from '../components/WelcomeBanner';
import { LinearGradient } from 'expo-linear-gradient';


export default function HomeScreen(props) {

  const TOTD = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar pellentesque ex at maximus. Nam feugiat rhoncus accumsan. ';
  const NAME = 'Will';
  const onPress = () => props.navigation.navigate("QuizScreen");

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
          colors={['#B905A2', '#6E00DD']}
          style={styles.gradient}
      />
      <WelcomeBanner NAME={NAME}></WelcomeBanner>
      <ScrollView>
      
      </ScrollView>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Quiz Button</Text>
          </TouchableOpacity>
        </View>
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
  buttonContainer:{
    alignSelf: 'center',
    margin: 10
},
button:{
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 8
},
text: {
    color: '#6E00DD',
    fontSize: 16,
    fontWeight: '600',   
}
});
