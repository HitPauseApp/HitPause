import * as React from 'react';
import firebase from '../Firebase';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, Svg, Path } from 'react-native';
import { AuthContext } from '../AuthContext.js';
import { Portal, Modal } from 'react-native-paper';
import TipOTD from '../components/TipOTD';
import WelcomeBanner from '../components/WelcomeBanner';
import { RFValue } from "react-native-responsive-fontsize";
import AppIcons from '../components/AppIcons';
import Music from '../assets/images/DancingDoodle.svg';
import Swiper from 'react-native-swiper/src';
//import user from '../../assets/images/userImg.png';


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
      <View style={{ height: RFValue(140) }}>
        <WelcomeBanner name={user.firstName} isAdmin={user.admin} navigation={props.navigation}></WelcomeBanner>
      </View>

      <View style={styles.swiperHolder}>
      <Swiper style={styles.wrapper} loop={false}>
      <View testID="Suggestion1" style={styles.homecard}>
          <Image source={require('../assets/images/MusicIcon.png')}
              style= {styles.pic}></Image>
       
        <View style={styles.cardText}> 
            <Text style={styles.textForCard}>Need some music?</Text>
            <Text style={styles.textForCard}>We have some for you.</Text>
         </View>
        </View>

      <View testID="Suggestion2" style={styles.homecard}>
          <Image source={require('../assets/images/JumpDoodle.png')}
              style= {styles.pic2}></Image>
      
        <View style={styles.cardText2}> 
            <Text style={styles.textForCard}>Feeling Anxious?</Text>
            <Text style={styles.textForCard}>Take our quiz.</Text>
         </View>
      </View>

      <View testID="Suggestion3" style={styles.homecard}>
          <Image source={require('../assets/images/LoveDoodle.png')}
              style= {styles.pic3}></Image>
      
        <View style={styles.cardText3}> 
            <Text style={styles.textForCard}>Keep track of your emotions.</Text>
            <Text style={styles.textForCard}>Start journaling.</Text>
         </View>
      </View>
      </Swiper>
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
          <View style={{ padding: RFValue(2), marginTop:'0%'}}>
            <View style={styles.card}>
              <View style={{ display: 'flex', flexDirection: 'row', padding: RFValue(10), alignItems: 'center' }}>
                <AppIcons name='materialicons:check-circle' color='#00095e'></AppIcons>
                <View style={{ paddingLeft: RFValue(10), flex: 1 }}>
                  <Text style={{ fontSize: RFValue(15), color: '#00095e', fontFamily: 'Poppins-Bold' }}>Your Profile is up to date!</Text>
                  <Text style={{ fontSize: RFValue(11), color: '#00095e', fontFamily: 'Poppins-Medium'  }}>Thanks for helping us help you.</Text>
                </View>
              </View>
            </View>
          </View>
        )
      }
      <View style={styles.tipHolder}>
      <TipOTD></TipOTD>
      </View>
      {/* <View style={{ flex: 1 }}></View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  card: {
    borderRadius: RFValue(20),
    height: '30%',
    width:'90%',
    alignSelf: 'center',
    backgroundColor: 'white', //'#E1E2E2',
    marginTop:'5%',
   // display: 'flex',
    alignItems: 'center',
    shadowColor:  "#000",
    shadowOffset: {
      width: RFValue(0),
      height: RFValue(2),
    },
    borderRadius: RFValue(15),
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
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
  },
  homecard: {
    backgroundColor: '#F2FCFD',
    // opacity: 0.4,
    height: '94%',//'25%',
    width: '90%',//'92%',
    alignSelf: 'center',
    borderRadius: RFValue(15),
    shadowColor:  "#000",
    shadowOffset: {
    width: RFValue(1),
    height: RFValue(5),
  },
  shadowOpacity: 0.25,
  shadowRadius: RFValue(3.84),
  elevation: RFValue(1),
  justifyContent:'center',
  alignContent: 'center',
  //flexWrap:'wrap'
  },

  pic: {
    height: '55%',
    width: '55%',
    overflow:'visible',
    alignSelf:'flex-end',
    marginTop: '27%',
    flex:1,
    left:'1%'
  },
  pic2: {
    height: '48%',
    width: '48%',
    overflow:'visible',
    alignSelf:'flex-start',
    marginTop: '22%',
    flex:1,
    left:'2.8%'
  },
  pic3: {
    height: '50%',
    width: '50%',
    overflow:'visible',
    alignSelf:'flex-end',
    marginTop: '25%',
    flex:1,
    right:'3%'
  },
  cardText: {
    //backgroundColor: 'blue',
    height: '40%',
    width: '43%',
    left: '5%',
    bottom: '25%'
   // alignSelf: 'flex-start',
   // marginTop: '10%',
   // flexDirection:'column',
    //flex:1
  },
  cardText2: {
    //backgroundColor: 'blue',
    height: '40%',
    width: '43%',
    right: '1%',
    bottom: '20%',
    alignSelf: 'flex-end',
   // marginTop: '10%',
   // flexDirection:'column',
    //flex:1
  },
  cardText3: {
    //backgroundColor: 'blue',
    height: '40%',
    width: '43%',
    left: '5%',
    bottom: '25%',
    alignSelf: 'flex-start',
   // marginTop: '10%',
   // flexDirection:'column',
    //flex:1
  },
  textForCard: {
    fontSize: RFValue(12), 
    color: '#00095e', 
    fontFamily: 'Poppins-Bold'
  },
  swiperHolder: {
    height: '30%',
  },
  tipHolder: {
    height:'25%',
    //flex:1,
    bottom:'17%'
  }
});