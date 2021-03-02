import * as React from 'react';
import firebase from '../../Firebase.js'
import h from '../../globals';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { AuthContext } from '../../AuthContext.js';
import AppIcons from '../../components/AppIcons.js';
import { RFValue } from 'react-native-responsive-fontsize';
import { Portal, Modal } from 'react-native-paper';

export default function PauseHome(props) {
  const user = React.useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
      <TouchableOpacity onPress={showModal} style={{padding: 10}}>
        <AppIcons name="fontawesome5:info-circle" color={h.colors.primary}/>
      </TouchableOpacity>
        <View style={{ height: Dimensions.get('window').height - 54, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          
          <View style={{ paddingVertical: 30 }}>
            <Text style={{ color: h.colors.primary, fontSize: RFValue(24), textAlign: 'center',fontFamily: 'Poppins-Bold' }}>HIT PAUSE</Text>
            <Text style={{ color: h.colors.primary, fontSize: RFValue(13), fontFamily: 'Poppins-Medium' }}>TO TAKE CONTROL OF YOUR ANXIETY</Text>
          </View>
          <TouchableOpacity style={styles.pauseButton} onPress={() => props.navigation.navigate('PauseSurvey')}>
            <AppIcons name="materialicons:pause" size={RFValue(200)} color={h.colors.primary}></AppIcons>
          </TouchableOpacity>
          <Text style={{ paddingTop: 30, color: h.colors.primary, fontFamily: 'Poppins-Medium' }}>Tap the Pause Button to start!</Text>
          
        </View>
        
      </ScrollView>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContent}>
          <View>
            <Text style={styles.modalHeadingText}>The HitPause Survey</Text>
            <Text style={styles.modalText}>This short survey asks 10 questions regarding your current experience with anxiety.
              Once the survey has been completed, our custom designed suggestion algorithm, The Pause Algorithm, will suggest an activity
              or response for how to address your anxiety.
            </Text>
          </View>
        </Modal>
      </Portal>
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