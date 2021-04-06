import * as React from 'react';
import h from '../../globals';
import { View, StyleSheet, Text, Image, Button, ScrollView } from 'react-native';
import firebase from '../../Firebase.js';
import { AuthContext } from '../../AuthContext.js';
import NotificationHandler from '../../components/notifications/NotificationHandler';
import { RFValue } from "react-native-responsive-fontsize";

export default function NotificationsScreen(props) {
  const user = React.useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        
        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>Notifications</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Survey Reminders</Text>
            <NotificationHandler notificationType={"survey_reminder"}></NotificationHandler>
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>Quote of the Day</Text>
            <NotificationHandler notificationType={"QOTD"}></NotificationHandler>
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>Check In Reminders</Text>
            <NotificationHandler notificationType={"checkin_reminder"}></NotificationHandler>
          </View>
        </View>
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
    color: h.colors.primary,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginRight: 10
  },
  switch: {
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
  settingsGroup: {
    paddingHorizontal: 40
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  groupTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(20),
    color: h.colors.primary,
    marginBottom: 10
  }
});