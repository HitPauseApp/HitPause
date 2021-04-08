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
      <Text></Text>

    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
  },
  pauseButton: {
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').width * 0.75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 15,
    borderColor: h.colors.primary,
    backgroundColor: h.colors.secondary,
    borderRadius: 999,
    overflow: 'hidden'
  },
  modalContent:{
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    margin: 30,
  },
  modalHeadingText:{
    textAlign: 'center',
    padding: 5,
    fontFamily: 'Poppins-Medium',
    fontSize: 25,
    color: h.colors.primary
  },
  modalText: {
    padding: 15,
    fontFamily: 'Poppins-Light',
    fontSize: 15,
    color: h.colors.primary,
    textAlign: 'center',
  }
});