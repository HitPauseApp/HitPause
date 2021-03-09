import * as React from 'react';
import firebase from '../Firebase';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../AuthContext.js';
import { RFValue } from "react-native-responsive-fontsize";
import AppIcons from '../components/AppIcons';
import Swiper from 'react-native-swiper/src';

export default function ReviewScreen(props) {
  const user = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  page: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  getStarted: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 75,
    height: 50,
    backgroundColor: '#cbebf7',
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(1),
      height: RFValue(5),
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
    display: 'flex',
    paddingHorizontal: 16
  },
  buttonTextContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: '#00095e',
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  textContainer: {
    width: '100%',
    padding: 30
  },
  titleText: {
    fontSize: RFValue(48),
    color: '#00095e',
    fontFamily: 'Poppins-Light'
  },
  largeText: {
    fontSize: RFValue(28),
    color: '#00095e',
    fontFamily: 'Poppins-Light'
  },
  smallText: {
    fontSize: RFValue(14),
    color: '#00095e',
    fontFamily: 'Poppins-Light'
  }
});
