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
  const [showInitialAssessment, setShowInitalAssessment] = React.useState(false);

  React.useEffect(() => {
    if (user.isNewUser) {
      props.navigation.navigate('WelcomeTutorial');
      user.ref.update({ isNewUser: false });
    }
    user.ref.child('profile/traits').on('value', (s) => {
      if (!s.exists()) setShowInitalAssessment(true);
      else setShowInitalAssessment(false);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontFamily: 'Poppins-Light', fontSize: RFValue(20), color: '#00095e' }}>Welcome Back,</Text>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: RFValue(32), color: '#00095e' }}>{user.firstName} {user.lastName}!</Text>
        {/* <WelcomeBanner name={user.firstName} isAdmin={user.admin} navigation={props.navigation}></WelcomeBanner> */}
      </View>

      <View style={{ height: 220 }}>
        <Swiper loop={false}>
          <TouchableOpacity testID="Suggestion1" style={styles.homecard} onPress={() => props.navigation.navigate('History')}>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>Need some music?</Text>
              <Text style={styles.cardText}>We have some for you.</Text>
            </View>
            <Image source={require('../assets/images/MusicIcon.png')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity testID="Suggestion2" style={styles.homecard} onPress={() => props.navigation.navigate('PauseHome')}>
            <Image source={require('../assets/images/JumpDoodle.png')} style={styles.cardImage} />

            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>Feeling Anxious?</Text>
              <Text style={styles.cardText}>Take our quiz.</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity testID="Suggestion3" style={styles.homecard} onPress={() => props.navigation.navigate('Journal')}>
            <Image source={require('../assets/images/LoveDoodle.png')} style={styles.cardImage} />

            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>Keep track of your emotions.</Text>
              <Text style={styles.cardText}>Start journaling.</Text>
            </View>
          </TouchableOpacity>
        </Swiper>
      </View>

      <View style={{ flex: 1, display: 'flex' }}>

        {
          showInitialAssessment ? (
            <View style={styles.row}>
              <TouchableOpacity style={styles.card} onPress={() => props.navigation.navigate('ProfileSurvey')}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                  <AppIcons name='materialicons:info' color='#222'></AppIcons>
                  <View style={{ paddingLeft: 10, flex: 1 }}>
                    <Text style={{ fontSize: RFValue(18) }}>Complete your profile survey!</Text>
                    <Text style={{ fontSize: RFValue(12) }}>It helps us help you.</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.row}>
              <View style={styles.card}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                  <AppIcons name='materialicons:check-circle' color='#00095e'></AppIcons>
                  <View style={{ paddingLeft: 10, flex: 1 }}>
                    <Text style={{ fontSize: RFValue(15), color: '#00095e', fontFamily: 'Poppins-Bold' }}>Your Profile is up to date!</Text>
                    <Text style={{ fontSize: RFValue(11), color: '#00095e', fontFamily: 'Poppins-Medium' }}>Thanks for helping us help you.</Text>
                  </View>
                </View>
              </View>
            </View>
          )
        }

        <View style={styles.row}>
          <View style={styles.card}>
            <TipOTD></TipOTD>
          </View>
        </View>
        <TouchableOpacity style={styles.badgecard} onPress={() => props.navigation.navigate('Journal')}>
          <Text style={styles.cardText}>Earn More Badges.</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.cardText}>Test</Text>
            <Text style={styles.cardText}>Test</Text>
            <Text style={styles.cardText}>Test</Text>
          </View>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  row: {
    // flex: 1,
    padding: 16,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: RFValue(20),
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(10),
      height: RFValue(10),
    },
    elevation: 3,
    borderRadius: RFValue(15),
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
    backgroundColor: '#F2FCFD'
  },
  badgeContainer: {
    //display: 'flex',
    flexDirection: 'row',
  },
  badgecard: {
    backgroundColor: '#F2FCFD',
    height: 200,
    width: '90%',
    alignSelf: 'center',
    borderRadius: RFValue(15),
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(1),
      height: RFValue(5),
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
    elevation: 3,
    display: 'flex',
    //flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  homecard: {
    backgroundColor: '#F2FCFD',
    height: 200,
    width: '90%',
    alignSelf: 'center',
    borderRadius: RFValue(15),
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(1),
      height: RFValue(5),
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
    elevation: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  cardImage: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RFValue(140),
  },
  cardTextContainer: {
    flex: 1,
    paddingHorizontal: 8
  },
  cardText: {
    fontSize: RFValue(12),
    color: '#00095e',
    fontFamily: 'Poppins-Bold'
  }
});
