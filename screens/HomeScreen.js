import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, ImageBackground } from 'react-native';
import { AuthContext } from '../AuthContext.js';
import { Portal, Modal } from 'react-native-paper';
import TipOTD from '../components/TipOTD';
import WelcomeBanner from '../components/WelcomeBanner';
import albumImage from '../assets/images/album-placeholder.png';
import { RFValue } from "react-native-responsive-fontsize";
import Slider from 'react-slick';
import MagicSliderDots from 'react-magic-slider-dots';

export default function HomeScreen(props) {
  const user = React.useContext(AuthContext);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  const TOTD = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar pellentesque ex at maximus. Nam feugiat rhoncus accumsan. ';
  return (
    <ScrollView style={styles.container}>
      <ImageBackground style={ styles.imgBackground }  
        source={require('../assets/images/mountain.png')}>
        <WelcomeBanner name={user.firstName}></WelcomeBanner>
      </ImageBackground>

      <View style={styles.contentContainer}>
      <Text style={styles.header}>Recently Played</Text>
      <View style={styles.recentTab}>
        <Image source={albumImage} style={styles.albumImages}></Image>
        <Image source={albumImage} style={styles.albumImages}></Image>
        <Image source={albumImage} style={styles.albumImages}></Image>
      </View>
      <Text style={styles.header}>Recently Liked</Text>
      <View style={styles.recentTab}>
        <TouchableOpacity onPress={showModal}>
          <Image source={albumImage} style={styles.albumImages}></Image>
        </TouchableOpacity>
        
        <Image source={albumImage} style={styles.albumImages}></Image>
        <Image source={albumImage} style={styles.albumImages}></Image>
      </View>
      <Text style={styles.text2}>Need to adjust your assessment?</Text>
      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('InitialAssessment')}>
        <Text style={styles.text}>Retake Assessment</Text>
      </TouchableOpacity>
      <TipOTD TOTD={TOTD}></TipOTD>
      </View>
      <Portal>
        <Modal visible={visible} dismissable={false} contentContainerStyle={styles.tourModal}>
          <Text style={styles.modalHeader}>Welcome to the HitPause family!</Text>
          <Text style={styles.modalText}>Our goal is to provide each and every user with their own tips and tricks on how to 
          better deal with their anxiety. Click next to take the virtual tour and get started!</Text>
          <View style={styles.recentTab}>
            <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
              <Text style={styles.modalText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
              <Text style={styles.modalText}>Next</Text>
            </TouchableOpacity>
          </View>
          <MagicSliderDots dots={true} numDotsToShow={4} dotWidth={30} />;
        </Modal>
      </Portal>  
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00095e',
    flex: 1
  },
  contentContainer: {
    flex: 1,
    bottom:'21%'
    
  },
  header:{
    padding: 15,
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: 'white'
  },
  imgBackground: {
    width: '100%',
    height: '55%',
  },
  tourModal:{
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
  modalHeader:{
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Poppins-Light',
    fontSize: 25,
    color: 'white'
  },
  modalText:{
    padding: 15,
    fontFamily: 'Poppins-Extra-Light',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  recentTab:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  albumImages: {
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  buttonContainer:{
    margin: 10,
    padding: 10
  },
  button:{
    marginBottom: 20,
    backgroundColor: '#132090',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 8
  },
  modalButton:{
    backgroundColor: '#00095e',
    borderRadius: 8,
    width: RFValue(80),
  },
  text: {
    color: 'white',
    fontSize: 16,   
    fontFamily: 'Poppins-Medium'
  },
  text2: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    marginTop: 50,
    marginBottom: 5,
  }

  
});
