import * as React from 'react';
import h from '../globals';
import firebase from '../Firebase';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../AuthContext.js';
import { RFValue } from "react-native-responsive-fontsize";
import AppIcons from '../components/AppIcons';

export default function ReviewScreen(props) {
  const user = React.useContext(AuthContext);
  const surveyData = props.route.params.surveyData;

  function ratingChanged(value) {
    user.ref.child(`profile/pauseSurveys/${surveyData.id}/rating`).set(value);
    // Might need more handling code... not sure yet
  }

  return (
    <View style={styles.container}>
      <Text>{surveyData.id}</Text>
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
    backgroundColor: h.colors.secondary,
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
    color: h.colors.primary,
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
    color: h.colors.primary,
    fontFamily: 'Poppins-Light'
  },
  largeText: {
    fontSize: RFValue(28),
    color: h.colors.primary,
    fontFamily: 'Poppins-Light'
  },
  smallText: {
    fontSize: RFValue(14),
    color: h.colors.primary,
    fontFamily: 'Poppins-Light'
  }
});
