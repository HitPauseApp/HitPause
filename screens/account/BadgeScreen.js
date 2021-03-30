import * as React from 'react';
import { View, StyleSheet, Text, Image, Button, ScrollView } from 'react-native';
import firebase from '../../Firebase.js';
import h from '../../globals';
import { AuthContext } from '../../AuthContext.js';
import { RFValue } from "react-native-responsive-fontsize";
import { AppContext } from '../../AppContext.js';
import BadgeIcon from '../../components/BadgeIcon.js';

export default function BadgeScreen(props) {
  const user = React.useContext(AuthContext);
  const histpause = React.useContext(AppContext);
  const [userBadges, setUserBadges] = React.useState([]);
  const [availableBadges, setAvailableBadges] = React.useState([]);

  React.useEffect(() => {
    user.ref.child('profile/badges').on('value', (s) => {
      if (s.exists()) {
        let badges = Object.entries(s.val());
        setUserBadges(badges.map(b => {
          return { ...histpause.badges[b[0]], timestamp: b[1] }
        }));
        setAvailableBadges(Object.values(histpause.badges).filter(b => !badges.map(badge => badge[0]).includes(b.id)));
      }
      else {
        setUserBadges([]);
        setAvailableBadges(Object.values(histpause.badges));
      }
    });
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.badges, { paddingVertical: 20 }]}>
        <Text style={styles.header}>Earned Badges</Text>
        <View style={{ display: 'flex', width: '100%', flex: 1 }}>
          {
            !!userBadges.length && userBadges.map(badge => (
              <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10, width: '100%' }} key={badge.id}>
                <View style={styles.badgeContainer}>
                  <BadgeIcon size={80} icon={badge.icon}></BadgeIcon>
                  <View style={styles.badgeTextContainer}>
                    <Text style={styles.badgeTextHeader}>{badge.title}</Text>
                    <Text style={styles.badgeText}>{badge.description}{'\n'}Earned {h.getDate(badge.timestamp)}</Text>
                  </View>
                </View>
              </View>
            ))
          }
        </View>

      </View>
      <View style={[styles.badges, { paddingBottom: 20 }]}>
        <Text style={styles.header}>Available Badges</Text>
        <View style={{ display: 'flex', width: '100%', flex: 1 }}>
          {
            !!availableBadges.length && availableBadges.map(badge => (
              <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10, width: '100%' }} key={badge.id}>
                <View style={styles.badgeContainer}>
                  <View style={styles.badgeTextContainer}>
                    <Text style={styles.badgeTextHeader}>{badge.title}</Text>
                    <Text style={styles.badgeText}>{badge.description}</Text>
                  </View>
                </View>
              </View>
            ))
          }
        </View>

      </View>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
  },
  badges: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: RFValue(24),
    color: h.colors.primary,
    fontFamily: 'Poppins-Bold'
  },
  badgeContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeTextContainer: {
    flex: 1,
    paddingHorizontal: 8
  },
  badgeTextHeader: {
    fontSize: RFValue(14),
    color: h.colors.primary,
    fontFamily: 'Poppins-Bold'
  },
  badgeText: {
    fontSize: RFValue(12),
    color: h.colors.primary,
    fontFamily: 'Poppins-Medium'
  },
});