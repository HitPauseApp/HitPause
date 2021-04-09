import * as React from 'react';
import firebase from '../../Firebase.js'
import h from '../../globals';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { AuthContext } from '../../AuthContext.js';
import AppIcons from '../../components/AppIcons.js';
import { RFValue } from 'react-native-responsive-fontsize';
import { Portal, Modal } from 'react-native-paper';

export default function ProfileCompleted(props) {
  const user = React.useContext(AuthContext);
  

  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>Thank You!</Text>
      <Text style={styles.smallText}>By filling out the profile survey, you've helped us help you.</Text>
      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
  },
  bigText: {
    textAlign: 'center',
    color: h.colors.primary, 
    fontSize: RFValue(50),
    paddingTop: 20,
    fontFamily: 'Poppins-Bold',
  },
  smallText: {
    textAlign: 'center',
    color: h.colors.primary, 
    fontSize: RFValue(25),
    padding: 20,
    fontFamily: 'Poppins-Medium',
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
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: RFValue(14),
    paddingLeft: 20,
    paddingRight: 20,
  }
});