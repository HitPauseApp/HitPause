import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, ImageBackground } from 'react-native';
import { AuthContext } from '../AuthContext.js';
import { Portal, Modal } from 'react-native-paper';
import TipOTD from '../components/TipOTD';
import WelcomeBanner from '../components/WelcomeBanner';
import { RFValue } from "react-native-responsive-fontsize";
import firebase from '../Firebase';



export default function HomeScreen(props) {
  const user = React.useContext(AuthContext);

  const [visible, setVisible] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [streak, setStreak] = React.useState(1);
  const [perfectWeek, setPerfectWeek] = React.useState(0);
  const [screenText, setScreenText] = React.useState([
    "Our goal is to provide each and every user with their own tips and tricks on how to better deal with their anxiety. Click next to take the virtual tour and get started",
    "The journal page is designed to help relieve stress through writing. Hit the pen and paper to start a new entry, or swipe left to delete a previously existing entry",
    "The quiz is 10 questions long and uses an algorithm, along with your answers from the initial assessment to give you some suggestions that are unique to you in the moment",
    "The history page allows you to look back on, and even rate, some of your past suggestions and playlists. Our rating system is designed to get to know what you enjoy, so it can be more accurate in the future"
  ]);
  const [screenHead, setScreenHead] = React.useState([
    "Welcome to the HitPause Family!",
    "Journal Screen",
    "Take the Quiz!",
    "History"
  ]);

  React.useEffect(() => {
    firebase.database().ref('users/' + user.uid + '/logins/').once('value').then(s => {
      setStreak(s.val().streak)
    })
  }, []);

  React.useEffect(() => {
    firebase.database().ref('users/' + user.uid + '/logins/').once('value').then(s => {
      setPerfectWeek(s.val().week)
    })
  }, []);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);




  let nextScreen = () =>{
    if(count < screenText.length - 1){
      setCount(count + 1);
    }
    else{
      setCount(0);
    }
  }

  const TOTD = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar pellentesque ex at maximus. Nam feugiat rhoncus accumsan. ';
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground style={ styles.image }  
          source={require('../assets/images/homepage.jpg')}>
          <WelcomeBanner name={user.firstName} isAdmin={user.admin} navigation={props.navigation}></WelcomeBanner>
        </ImageBackground>
      </View>

      <View style={styles.dailyTrackerContainer}>
        <View style = {styles.weekView}>
          <Text style={styles.dailyTrackerText}>Streak: {streak}</Text>
          <Text style={styles.dailyTrackerText}>|</Text>
          <Text style={styles.dailyTrackerText}>Weeks: {perfectWeek}</Text>
        </View>
        
      </View>
      <Text style={styles.text2}>Need to adjust your assessment?</Text>
      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('InitialAssessment')}>
        <Text style={styles.text}>Retake Assessment</Text>
      </TouchableOpacity>
      <TipOTD TOTD={TOTD}></TipOTD>
      <Portal>
        <Modal visible={visible} dismissable={false} contentContainerStyle={styles.tourModal}>
          <Text style={styles.modalHeader}>{screenHead[count]}</Text>
          <Text style={styles.modalText}>{screenText[count]}</Text>
          <View style={styles.recentTab}>
            <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
              <Text style={styles.modalText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={nextScreen}>
              <Text style={styles.modalText}>Next</Text>

            </TouchableOpacity>
          </View>
          
        </Modal>

      </Portal>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00095e',
    flex: 1
  },

  header:{
    padding: 15,
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: 'white'
  },
  image: {
    height: RFValue(180),
  },

  dailyTrackerContainer: {
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    height: RFValue(70),
    width: '95%',
    backgroundColor: '#132090',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    
  },

  dailyTrackerText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    textAlign: 'center',
  },

  weekView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  
  tourModal:{
    backgroundColor: '#132090',
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    margin: 30,
  },
  modalHeader:{
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Poppins-Light',
    fontSize: 25,
    color: 'white'
  },
  modalText:{
    padding: 15,
    fontFamily: 'Poppins-Extra-Light',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  recentTab:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  albumImages: {
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  buttonContainer:{
    margin: 10,
    padding: 10
  },
  button:{
    marginBottom: 20,
    backgroundColor: '#132090',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 8
  },
  modalButton:{
    backgroundColor: '#00095e',
    borderRadius: 8,
    width: RFValue(80),
  },
  text: {
    color: 'white',
    fontSize: 16,   
    fontFamily: 'Poppins-Medium'
  },
  text2: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    marginTop: 30,
    marginBottom: 5,
  }

  
});