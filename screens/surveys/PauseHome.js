import * as React from 'react';
import firebase from '../../Firebase.js'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { AuthContext } from '../../AuthContext.js';
import AppIcons from '../../components/AppIcons.js';
import { RFValue } from 'react-native-responsive-fontsize';

export default function PauseHome(props) {
  const user = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View style={{ height: Dimensions.get('window').height - 54, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ padding: RFValue(30) }}>
            <Text style={{ color: '#00095e', fontSize: RFValue(24), fontWeight: 'bold', textAlign: 'center',fontFamily: 'Poppins-Bold' }}>HIT PAUSE</Text>
            <Text style={{ color: '#00095e', fontSize: RFValue(13),fontFamily: 'Poppins-Medium' }}>TO TAKE CONTROL OF YOUR ANXIETY</Text>
          </View>
          <TouchableOpacity style={styles.pauseButton} onPress={() => props.navigation.navigate('PauseSurvey')}>
            <AppIcons name="materialicons:pause" size={RFValue(200)} color='#00095e'></AppIcons>
          </TouchableOpacity>
          <Text style={{ paddingTop: RFValue(20), color: '#00095e', fontFamily: 'Poppins-Medium' }}>Tap the Pause Button to start!</Text>
          <Text style={{ paddingTop: RFValue(30), color: '#00095e', fontFamily: 'Poppins-Light'  }}>Questions? Scroll down...</Text>
        </View>
        <View>
          <Text style={styles.modalHeadingText}>The HitPause Survey</Text>
          <Text style={styles.modalText}>This short survey asks 10 questions regarding your current experience with anxiety.
          Once the survey has been completed, our custom designed suggestion algorithm, The Pause Algorithm, will suggest an activity
          or response for how to address your anxiety.</Text>
        </View>
      </ScrollView>
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
    width: Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * 0.75,
    height: Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * 0.75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 15,
    borderColor: '#00095e',
    borderRadius: 999,
    overflow: 'hidden'
  },
  modalContent:{
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
  modalHeadingText:{
    textAlign: 'center',
    padding: 5,
    fontFamily: 'Poppins-Medium',
    fontSize: 25,
    color: '#00095e'
  },
  modalText: {
    padding: 15,
    fontFamily: 'Poppins-Light',
    fontSize: 15,
    color: '#00095e',
    textAlign: 'center',
  },
  info: {
    
  }
});