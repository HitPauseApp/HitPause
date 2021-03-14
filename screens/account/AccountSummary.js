import * as React from 'react';
import { View, StyleSheet, Text, Image, Button, ScrollView, TouchableOpacity } from 'react-native';
import firebase from '../../Firebase.js';
import h from '../../globals';
import { AuthContext } from '../../AuthContext.js';
import AppIcons from '../../components/AppIcons';
import userImg from '../../assets/images/userImg.png';
import { RFValue } from 'react-native-responsive-fontsize';


export default function Account(props) {
  const user = React.useContext(AuthContext);

  function handleLogout() {
    firebase.auth().signOut().catch((error) => {
      console.error(error);
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>

        <View style={styles.screenHeader}>
          <View style={styles.userContainer}>
            <Image source={userImg} style={styles.avatar}></Image>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
              <View style={styles.contactInfo}>
                <AppIcons name="materialicons:email" size={22} color={h.colors.primary} ></AppIcons>
                <Text style={styles.smallText}>{user.email}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainter1}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: h.colors.primary }]}
            onPress={() => props.navigation.navigate('AccountTraits')}
          >
            <Text style={styles.buttonText}>View My Traits</Text>
          </TouchableOpacity>
        </View>

        {/*<View style={styles.category}>
          <Text style={styles.text}>Quiz Reminders</Text>
          <QuizReminder></QuizReminder>
          </View>*/}

        <View style={styles.buttonContainter}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: h.colors.primary }]}
            onPress={() => props.navigation.navigate('NotificationsScreen')}
          >
            <Text style={styles.buttonText}>Notification Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainter}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: h.colors.primary }]}
            onPress={() => props.navigation.navigate('BadgeScreen')}
          >
            <Text style={styles.buttonText}>View Badges</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainter}>
          <TouchableOpacity style={[styles.button, { backgroundColor: h.colors.primary }]} onPress={() => handleLogout()}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingTop:100,
    display: 'flex',
    height: '100%'
  },
  userName: {
    color: h.colors.primary,
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(15),
  },
  smallText: {
    color: h.colors.primary,
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(9.5),
    left: '45%'
  },
  contactInfo: {
    width: '100%',
    flexDirection: "row",
    top: '2%'
  },
  avatar: {
    width: 100,
    height: 100,
  },
  userDetails: {
    flex: 1,
    paddingLeft: 20
  },
  screenHeader: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  userContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row'
  },
  authButton: {
    left: '100%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainter: {
    flex: 1,
    paddingTop: 20
  },
  buttonContainter1: {
    flex: 1,
    paddingTop: 40
  },
  button: {
    alignSelf: 'center',
    width: '80%',
    padding: 10,
    borderRadius: 999,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(12)
  }
});