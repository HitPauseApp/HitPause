import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View , ScrollView} from 'react-native';
import albumImage from '../assets/images/album-placeholder.png';
import { AntDesign } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';

export default function ReviewScreen({navigation: {goBack}}) {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
        <AntDesign name="arrowleft" size={30} color="white" />
      </TouchableOpacity>
      <Image source={albumImage} style={styles.albumImages}></Image>
      <Text style={styles.text}>Leave a Review!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00095e',
    flex: 1
  },
  albumImages: {
    borderRadius: 8,
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  backButton: {
    paddingLeft: 5,
    paddingTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,   
    fontFamily: 'Poppins-Extra-Light',
    padding: 15,
    textAlign: 'center',
    
  },
});