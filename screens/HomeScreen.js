import * as React from 'react';
import firebase from '../Firebase';
import h from '../globals';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, Svg, Path } from 'react-native';
import { AuthContext } from '../AuthContext.js';
import { Portal, Modal } from 'react-native-paper';
import TipOTD from '../components/TipOTD';
import WelcomeBanner from '../components/WelcomeBanner';
import { RFValue } from "react-native-responsive-fontsize";
import AppIcons from '../components/AppIcons';
import Music from '../assets/images/DancingDoodle.svg';
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
        let badges = Object.entries(s.val()).sort((a, b) => a[1] < b[1]).slice(0, 3);
        setUserBadges(badges.map(b => {
          return { ...hitpause.badges[b[0]], timestamp: b[1] }
        }));
      }
    })
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 16, paddingTop: 80 }}>
        <Text style={{ fontFamily: 'Poppins-Light', fontSize: RFValue(18), color: h.colors.primary }}>Welcome Back,</Text>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: RFValue(22), color: h.colors.primary }}>{user.firstName} {user.lastName}!</Text>
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
              <Text style={styles.cardText}>Take the Pause Survey.</Text>
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
                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', padding: 10, alignItems: 'center' }} onPress={() => props.navigation.navigate('ProfileSurvey')}>
                  {/*<AppIcons name='materialicons:check-circle' color='white'></AppIcons>*/}
                  <View style={{ paddingLeft: 10, flex: 1 }}>
                    <Text style={{ fontSize: RFValue(15), textAlign: 'center', color: h.colors.primary, fontFamily: 'Poppins-Bold' }}>Need to retake your profile survey?</Text>
                    <Text style={{ fontSize: RFValue(11), textAlign: 'center', color: h.colors.primary, fontFamily: 'Poppins-Medium' }}>Change your answers at any time</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )
        }

        <View style={styles.row}>
          <View style={[styles.card, { flexDirection: 'column' }]}>
            <Text style={styles.cardHeader}>Quote of the Day</Text>
            <TipOTD></TipOTD>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.card}>
            <View style={{ display: 'flex', alignItems: 'center', width: '100%', paddingHorizontal: 20 }}>
              <Text style={styles.cardHeader}>Recent Badges</Text>
              {
                !!Object.values(userBadges).length ? Object.values(userBadges).map(badge => (
                  <View style={{ paddingVertical: 10, width: '100%' }} key={badge.id}>
                    <View style={styles.badgeContainer}>
                      <BadgeIcon size={80} icon={badge.icon}></BadgeIcon>
                      <View style={styles.cardTextContainer}>
                        <Text style={styles.cardTextHeader}>{badge.title}</Text>
                        <Text style={styles.cardText}>{badge.description}{'\n'}Earned {h.getDate(badge.timestamp)}</Text>
                      </View>
                    </View>
                  </View>
                )) : (
                  <Text>You haven't earned any badges yet</Text>
                )
              }
              <TouchableOpacity
                style={[styles.button, { marginVertical: 20, width: '100%' }]}
                onPress={() => props.navigation.navigate('BadgeScreen')}
              >
                <Text style={styles.buttonText}>See All Badges</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={() => props.navigation.navigate('ProfileCompleted')}>
            <Text style={styles.buttonText}>Re-show Tutorial</Text>
          </TouchableOpacity>
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
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(1),
      height: RFValue(3),
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
    alignItems: 'center'
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
      height: RFValue(3),
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
  cardHeader: {
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
