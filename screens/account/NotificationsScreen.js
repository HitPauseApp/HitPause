import * as React from 'react';
import { View, StyleSheet, Text, Image, Button, AsyncStorage, ScrollView } from 'react-native';
import firebase from '../../Firebase.js';
import { AuthContext } from '../../AuthContext.js';

import QuizReminder from '../../components/settings/QuizReminder';
import NotificationHandler from '../../components/notifications/NotificationHandler';
import SpotifyAuthButton from '../../spotify/SpotifyAuthButton';

import AppIcons from '../../components/AppIcons';
import FillButton from '../../components/buttons/FillButton';
import userImg from '../../assets/images/user.png';


export default function NotificationsScreen(props) {
  const user = React.useContext(AuthContext);

  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>

        <NotificationHandler></NotificationHandler>
        <View style={styles.separator}></View>
        
        <View style={styles.category}>
          <Text style={styles.text}>Quiz Reminders</Text>
          <QuizReminder></QuizReminder>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.category}>
          <Text style={styles.text}>Quote of the Day</Text>
          <QuizReminder></QuizReminder>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.category}>
          <Text style={styles.text}>Check In Reminders</Text>
          <QuizReminder></QuizReminder>
        </View>

        <View style={styles.separator}></View>

      </View>

      
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00095e'
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  switch: {
    float: 'right',
    padding: 50
  },
  contentContainer: {
    flex: 1,
    paddingTop: '15%'
  },
  separator: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    width: '80%',
    alignSelf: 'center',
    margin: 20.5
  },
  category: {
    flexDirection: "row",
    marginLeft: 40
  },
});