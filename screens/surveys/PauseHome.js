import * as React from 'react';
import firebase from '../../Firebase.js'
import h from '../../globals';
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
          <View style={{ paddingVertical: 30 }}>
            <Text style={{ color: h.colors.primary, fontSize: RFValue(24), textAlign: 'center',fontFamily: 'Poppins-Bold' }}>HIT PAUSE</Text>
            <Text style={{ color: h.colors.primary, fontSize: RFValue(13), fontFamily: 'Poppins-Medium' }}>TO TAKE CONTROL OF YOUR ANXIETY</Text>
          </View>
          <TouchableOpacity style={styles.pauseButton} onPress={() => props.navigation.navigate('PauseSurvey')}>
            <AppIcons name="materialicons:pause" size={RFValue(200)} color={h.colors.primary}></AppIcons>
          </TouchableOpacity>
          <Text style={{ paddingTop: 30, color: h.colors.primary, fontFamily: 'Poppins-Medium' }}>Tap the Pause Button to start!</Text>
          <Text style={{ paddingTop: 10, color: h.colors.primary, fontFamily: 'Poppins-Light'  }}>Questions? Scroll down...</Text>
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