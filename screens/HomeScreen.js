import * as React from 'react';
import firebase from '../Firebase';
import h from '../globals';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, Svg, Path } from 'react-native';
import { AuthContext } from '../AuthContext.js';
import TipOTD from '../components/TipOTD';
import WelcomeBanner from '../components/WelcomeBanner';
import { RFValue } from "react-native-responsive-fontsize";
import AppIcons from '../components/AppIcons';
import Swiper from 'react-native-swiper/src';
import BadgeIcon from '../components/BadgeIcon';
import { setBadgeCountAsync } from 'expo-notifications';
import { AppContext } from '../AppContext';

export default function HomeScreen(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  const [showInitialAssessment, setShowInitalAssessment] = React.useState(false);
  const [userBadges, setUserBadges] = React.useState({});

  React.useEffect(() => {
    if (user.isNewUser) {
      props.navigation.navigate('WelcomeTutorial');
      user.ref.update({ isNewUser: false });
    }
    user.ref.child('profile/traits').on('value', (s) => {
      if (!s.exists()) setShowInitalAssessment(true);
      else setShowInitalAssessment(false);
    });
    user.ref.child('profile/badges').on('value', (s) => {
      if (!s.exists()) setUserBadges({});
      else {
        let badgeKeys = Object.keys(s.val());
        setUserBadges(badgeKeys.map(key => hitpause.badges[key]));
      }
    })
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
              <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={() => props.navigation.navigate('ProfileSurvey')}>
                <Text style={styles.buttonText}>Complete your profile survey!</Text>
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

        <View style={styles.row}>
          <View style={styles.card}>
            <View style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Text style={styles.badgeHeader}>Badges</Text>
              {
                !!Object.values(userBadges).length ? Object.values(userBadges).map(badge => (
                  <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                    <View style={styles.badgeContainer} key={badge.id}>
                      <BadgeIcon size={80} icon={badge.icon}></BadgeIcon>
                      <View style={styles.cardTextContainer}>
                        <Text style={styles.cardTextHeader}>{badge.title}</Text>
                        <Text style={styles.cardText}>{badge.description}</Text>
                      </View>
                    </View>
                  </View>
                )) : (
                  <Text>You haven't earned any badges yet</Text>
                )
              }
              <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('BadgeScreen')}>
                <Text style={styles.buttonText}>Earn More Badges</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

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
    backgroundColor: h.colors.secondary
  },
  badgeContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: h.colors.primary,
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
    backgroundColor: h.colors.secondary,
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
  cardTextHeader: {
    fontSize: RFValue(14),
    color: h.colors.primary,
    fontFamily: 'Poppins-Bold'
  },
  cardText: {
    fontSize: RFValue(12),
    color: h.colors.primary,
    fontFamily: 'Poppins-Medium'
  },
  badgeHeader: {
    fontSize: RFValue(24),
    color: h.colors.primary,
    fontFamily: 'Poppins-Bold',
    paddingTop: 16
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: RFValue(14)
  }
});
