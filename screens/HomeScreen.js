import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import TipOTD from '../components/TipOTD';

export default function HomeScreen() {

  const TOTD = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar pellentesque ex at maximus. Nam feugiat rhoncus accumsan. ';


  return (
    <View style={styles.container}>
      <ScrollView></ScrollView>
      <TipOTD TOTD={TOTD}></TipOTD>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111625'
  },
});
