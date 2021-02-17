import * as React from 'react';
import { View, StyleSheet, Text, Image, Button, AsyncStorage, ScrollView, TouchableOpacity} from 'react-native';
import firebase from '../../Firebase.js';
import { AuthContext } from '../../AuthContext.js';

import QuizReminder from '../../components/settings/QuizReminder';
import NotificationHandler from '../../components/notifications/NotificationHandler';
import SpotifyAuthButton from '../../spotify/SpotifyAuthButton';

import AppIcons from '../../components/AppIcons';
import FillButton from '../../components/buttons/FillButton';
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

        <View style={styles.userContainer}> 
         <Image source={userImg} style={styles.avatar}></Image>
         <View style={styles.category}>
           {/* <AppIcons name="materialicons:person" color='#00095e'></AppIcons> */}
            <Text style={styles.text}>{user.firstName} {user.lastName}</Text>
        <View style={styles.category1}>
          <AppIcons name="materialicons:email" size={22} color="#00095e" ></AppIcons>
          <Text style={styles.text1}>{user.email}</Text>
        </View>
           {/* <Text onPress={() => props.navigation.navigate('AccountTraits')}>Traits</Text> */}
        </View>
        </View>
        

        {/* <View style={styles.separator}></View> */}

        {/* <View style={styles.category2}>
          <AppIcons name="materialicons:email" color="#00095e" ></AppIcons>
          <Text style={styles.text}>{user.email}</Text>
        </View> */}

        {/* <View style={styles.separator}></View> */}

       

        {/* <View style={styles.separator}></View> */}

        {/* <View style={styles.category3}>
          <AppIcons name="materialcommunityicons:textbox-password" size={30} color="#00095e" />
          <Text style={styles.text}>*******</Text>
        </View> */}

        {/* <View style={styles.separator}></View> */}

        {/*<View style={styles.category}>
          <Text style={styles.text}>Quiz Reminders</Text>
          <QuizReminder></QuizReminder>
        </View>

        <View style={styles.separator}></View>*/}

        <TouchableOpacity style={styles.notifications} onPress={() => props.navigation.navigate('NotificationsScreen')}>
          <Text style={styles.notifications}>Notification Settings</Text>
        </TouchableOpacity>
         <View style={styles.separator}></View>
      </View>

       <View style={styles.category2}>
          <View style={styles.spotifyLogo}>
          <AppIcons name="fontawesome5:spotify" size={40} color="white"/>
          </View>
          {/* This is bad data, only using as placeholder */}
          {/* <Text style={styles.text}>{user ? 'Connected' : 'Not Connected'}</Text> */}
          <View style ={styles.authButton}>
          <SpotifyAuthButton></SpotifyAuthButton>
          </View>
        </View>
        <Text
          style={styles.signOut}
          onPress={() => handleLogout()}
        >Sign Out</Text>

      {/*<SpotifyButton href="https://open.spotify.com/playlist/37i9dQZF1DX9B1hu73DioC?si=3i6KmA--RBi9aVggiR0z3Q"></SpotifyButton>*/}

      <Text
        style={styles.deleteData}
        onPress={() => {
          AsyncStorage.removeItem('userData');
        }}
      >Delete Local Account Data</Text>

      {/*<NotificationHandler></NotificationHandler>*/}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  text: {
    color: '#00095e',
    //textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(15),
    //bottom: '80%'
    // bottom: '100%'
    //marginLeft: 30
  },
  text1: {
    color: '#00095e',
    //textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(9.5),
    left: '45%'
    //bottom: '80%'
    // bottom: '100%'
    //marginLeft: 30
  },
  contentContainer: {
    flex: 1,
    paddingTop: '15%'
  },
  separator: {
    borderBottomColor: '#D4D5D7',
    borderBottomWidth: 2,
    width: '90%',
    top: '60%',
    left: '5%'
    //alignSelf: 'center',
    //margin: 20.5
  },
  category: {
    //backgroundColor:'blue',
    height: '50%',
    width: '50%',
    left: '35%',
    bottom: '80%'
    //justifyContent:'center'
    //flexDirection: "row",
    //marginLeft: 40
  },
  category1: {
    //backgroundColor:'blue',
    //height: '20%',
    width: '100%',
    //left: '40%',
    //bottom: '30%',
    //justifyContent:'center'
    flexDirection: "row",
    top:'2%'
    //marginLeft: 40
  },
  category2: {
    backgroundColor:'#1DB954',
    height: '20%',
    width: '85%',
    //left: '40%',
    //bottom: '30%',
    //justifyContent:'center'
    alignSelf:'center',
    flexDirection: "row",
    marginTop: '20%',
    borderRadius: RFValue(30),
    //marginLeft: 40
  },
  avatar: {
    width: 100,
    height: 100,
    alignSelf: 'flex-start',
    left:'5%',
    top: '20%'
    //margin: 20
  },
  signOut: {
    color: '#00095e',
    alignSelf: 'center',
    top: '70%',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(10),
    alignSelf:'center',
    //left: '7%'
  },
  deleteData: {
    color: '#00095e',
    alignSelf: 'center',
    top: '50%',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(10),
    //marginBottom: 10
  },
  notifications: {
    color: '#00095e',
    alignSelf: 'center',
    top: '50%',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(11),
    alignSelf:'flex-start',
    left: '3%'
    
  },
  userContainer: {
    flexDirection: 'column',
    height: '35%',
    //backgroundColor: '#FAFDF2',
    //justifyContent: 'center'
  },
  spotifyLogo: {
    left: '70%',
    justifyContent:'center'
  },
  authButton:{
    left:'100%',
    width:'50%',
    //backgroundColor:'yellow',
    alignItems:'center',
    justifyContent:'center',
    //flex:1
  }
});