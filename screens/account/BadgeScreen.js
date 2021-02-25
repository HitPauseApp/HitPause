import * as React from 'react';
import { View, StyleSheet, Text, Image, Button, AsyncStorage, ScrollView } from 'react-native';
import firebase from '../../Firebase.js';
import { AuthContext } from '../../AuthContext.js';
import { RFValue } from "react-native-responsive-fontsize";




export default function BadgeScreen(props) {
  const user = React.useContext(AuthContext);

  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.badges}>
        <Text style={styles.text}>My Earned Badges</Text>
        <View stlye={styles.badgeContainer}>
          
        </View>

      </View>
      <View style={styles.badges}>
        <Text style={styles.text}>Get More Badges Now</Text>
        <View stlye={styles.badgeContainer}>

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
    color: '#00095e',
    fontFamily: 'Poppins-Bold'
  },
  badges: {
    flex: 1,
    alignItems: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
  }
});