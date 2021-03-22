import * as React from 'react';
import h from '../globals';
import firebase from '../Firebase';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../AuthContext.js';
import { AppContext } from '../AppContext.js';
import { RFValue } from "react-native-responsive-fontsize";
import AppIcons from '../components/AppIcons';
import { Rating } from 'react-native-ratings';

export default function ReviewScreen(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  const surveyData = props.route.params.surveyData;

  function ratingChanged(value) {
    user.ref.child(`profile/pauseSurveys/${surveyData.id}/rating`).set(value);
    // Might need more handling code... not sure yet
  }

  return (
    <View style={styles.container}>
      {
        !!surveyData.selected &&
        <View style={styles.reviewContainer}>
          <AppIcons name={hitpause.suggestions[surveyData.selected].icon} size={RFValue(200)} color={h.colors.primary} />
          <Text style={styles.largeText}>{hitpause.suggestions[surveyData.selected].text}</Text>
          <Text style={styles.smallText}>{hitpause.suggestions[surveyData.selected].body}</Text>
          <Text style={styles.smallText}>How well did this work for you?</Text>
          <Rating 
            count={5}
            reviews={["Terrible", "Bad", "Okay", "Good", "Great!"]}
            defaultRating={0}
            size={20}
            onFinishRating={(r) => ratingChanged(r)}
          />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  reviewContainer: {
     alignItems: 'center',
  },
  largeText: {
    fontSize: RFValue(28),
    color: h.colors.primary,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
  },
  smallText: {
    fontSize: RFValue(14),
    color: h.colors.primary,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    padding: 10,
  }
});