import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import TipOTD from '../components/TipOTD';
import WelcomeBanner from '../components/WelcomeBanner';


export default function HomeScreen() {

  const TOTD = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar pellentesque ex at maximus. Nam feugiat rhoncus accumsan. ';
  const NAME = 'Will Newcomb';

  return (
    <View style={styles.container}>
      <WelcomeBanner NAME={NAME}></WelcomeBanner>
      <ScrollView></ScrollView>
      <TipOTD TOTD={TOTD}></TipOTD>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#040926'
  },
});
