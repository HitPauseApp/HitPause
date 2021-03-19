import * as React from 'react';
import h from '../globals';
import firebase from '../Firebase';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../AuthContext.js';
import { RFValue } from "react-native-responsive-fontsize";
import AppIcons from '../components/AppIcons';
import Swiper from 'react-native-swiper/src';

export default function WelcomeTutorial(props) {
  const user = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Swiper loop={false}>
        <View style={styles.page}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Welcome</Text>
            <Text style={styles.smallText}>Our mission is to provide you with healthy, effective ways to deal with anxiety. Swipe to learn more about how to use our app and start taking control!</Text>
          </View>
        </View>

        <View style={styles.page}>
          <View style={styles.textContainer}>
            <Text style={styles.largeText}>Feeling Anxious?</Text>
            <Text style={styles.smallText}>When you begin to feel anxious, open our app and hit the pause button (literally)! The "Pause Survey" is a 10 question survey that aims to figure out what would be the best way to respond to whatever you might be facing. Once you have completed the survey, it's time to calculate some results!</Text>
          </View>
        </View>

        <View style={styles.page}>
          <View style={styles.textContainer}>
            <Text style={styles.largeText}>Suggestions</Text>
            <Text style={styles.smallText}>We use a custom algorithm to suggest stress and anxiety relieving activities. It could be anything from going for a walk, to calling a friend, or even suggesting a relaxing Spotify playlist to listen to! You'll mark the activity you'd like to try, and later you can give us feedback on how it helped (or did not help) you. This helps us make better suggestions in the future!</Text>
          </View>
        </View>

        <View style={styles.page}>
          <View style={styles.textContainer}>
            <Text style={styles.largeText}>Journaling</Text>
            <Text style={styles.smallText}>Part of our mission with this app is to help you stay in touch with your feelings and emotions. We included a simple journaling tool that you can use at any time to jot down your thoughts.</Text>
          </View>
        </View>

        <View style={styles.page}>
          <View style={styles.textContainer}>
            <Text style={styles.largeText}>Let's begin!</Text>
            <Text style={styles.smallText}>We look forward to walking with you in this journey towards better mental health! Tap the "Get Started" button below to access the rest of the app.</Text>
          </View>
          <TouchableOpacity style={styles.getStarted} onPress={() => props.navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
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
    justifyContent: 'center',
    alignItems: 'center',
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
