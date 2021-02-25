import * as React from 'react';
import { View, StyleSheet, Text, Image, Button, AsyncStorage, ScrollView } from 'react-native';
import firebase from '../../Firebase.js';
import { AuthContext } from '../../AuthContext.js';

import QuizReminder from '../../components/settings/QuizReminder';
import NotificationHandler from '../../components/notifications/NotificationHandler';
import { RFValue } from "react-native-responsive-fontsize";



export default function NotificationsScreen(props) {
  const user = React.useContext(AuthContext);

  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        
        <View style={styles.category}>
          <Text style={styles.text}>Quiz Reminders</Text>
          <NotificationHandler notificationType={"quiz_reminder"}></NotificationHandler>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.category}>
          <Text style={styles.text}>Quote of the Day</Text>
          <NotificationHandler notificationType={"QOTD"}></NotificationHandler>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.category}>
          <Text style={styles.text}>Check In Reminders</Text>
          <NotificationHandler notificationType={"checkin_reminder"}></NotificationHandler>
        </View>

        <View style={styles.separator}></View>

      </View>

      
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  text: {
    fontSize: RFValue(12),
    color: '#00095e',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginRight: 10
  },
  switch: {
   // float: 'right',
    padding: 50,
  },
  contentContainer: {
    flex: 1,
    paddingTop: '15%'
  },
  separator: {
    borderBottomColor: 'black',
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