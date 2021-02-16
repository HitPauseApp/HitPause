import * as React from 'react';
import firebase from '../Firebase';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { AuthContext } from '../AuthContext.js';
import { Portal, Modal } from 'react-native-paper';
import TipOTD from '../components/TipOTD';
import WelcomeBanner from '../components/WelcomeBanner';
import { RFValue } from "react-native-responsive-fontsize";
import AppIcons from '../components/AppIcons';

export default function HomeScreen(props) {
  const user = React.useContext(AuthContext);

  const [visible, setVisible] = React.useState(false);
  const [count, setCount] = React.useState(0);
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
  const [showInitialAssessment, setShowInitalAssessment] = React.useState(false);

  React.useEffect(() => {
    user.ref.child('profile/traits').on('value', (s) => {
      if (!s.exists()) setShowInitalAssessment(true);
      else setShowInitalAssessment(false);
    })
  }, [])

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  let nextScreen = () => {
    if (count < screenText.length - 1) {
      setCount(count + 1);
    }
    else {
      setCount(0);
    }
  }



  return (
    <View style={styles.container}>
      <View style={{ height: RFValue(200) }}>
        <WelcomeBanner name={user.firstName} isAdmin={user.admin} navigation={props.navigation}></WelcomeBanner>
      </View>
      {
        showInitialAssessment ? (
          <View style={{ padding: RFValue(10) }}>
            <TouchableOpacity style={styles.card} onPress={() => props.navigation.navigate('ProfileSurvey')}>
              <View style={{ display: 'flex', flexDirection: 'row', padding: RFValue(10), alignItems: 'center' }}>
                <AppIcons name='materialicons:info' color='#222'></AppIcons>
                <View style={{ paddingLeft: RFValue(10), flex: 1 }}>
                  <Text style={{ fontSize: RFValue(18) }}>Complete your profile survey!</Text>
                  <Text style={{ fontSize: RFValue(12) }}>It helps us help you.</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ padding: RFValue(10) }}>
            <View style={styles.card}>
              <View style={{ display: 'flex', flexDirection: 'row', padding: RFValue(10), alignItems: 'center' }}>
                <AppIcons name='materialicons:check-circle' color='#222'></AppIcons>
                <View style={{ paddingLeft: RFValue(10), flex: 1 }}>
                  <Text style={{ fontSize: RFValue(18) }}>Your Profile is up to date!</Text>
                  <Text style={{ fontSize: RFValue(12) }}>Thanks for helping us help you.</Text>
                </View>
              </View>
            </View>
          </View>
        )
      }
      <TipOTD></TipOTD>
      <View style={{ flex: 1 }}></View>
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
  card: {
    borderRadius: RFValue(20),
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center'
  },
  badgeContainer: {
    backgroundColor: '#132090',
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 50,
    marginTop: 50
  },
  tourModal: {
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
  modalHeader: {
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Poppins-Light',
    fontSize: 25,
    color: 'white'
  },
  modalText: {
    padding: 15,
    fontFamily: 'Poppins-Extra-Light',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  recentTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  albumImages: {
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  buttonContainer: {
    margin: 10,
    padding: 10
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#132090',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 8
  },
  modalButton: {
    backgroundColor: '#00095e',
    borderRadius: 8,
    width: RFValue(80),
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium'
  }
});