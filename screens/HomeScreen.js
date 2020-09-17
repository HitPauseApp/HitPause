import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';

import TipOTD from '../components/TipOTD';
import FillButton from '../components/buttons/FillButton';

export default function HomeScreen(props) {

  const TOTD = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar pellentesque ex at maximus. Nam feugiat rhoncus accumsan. ';
  const onPress = () => props.navigation.navigate("QuizScreen");

  return (
    <View style={styles.container}>
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
    flex: 2,
    backgroundColor: '#191414'
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
