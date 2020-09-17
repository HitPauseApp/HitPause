import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import WelcomeBanner from '../components/WelcomeBanner';

export default function QuizScreen() {

  const NAME = "Journal Page"

  return (
    <View style={styles.container}>
        <WelcomeBanner NAME={NAME}></WelcomeBanner>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040926'
  },
});