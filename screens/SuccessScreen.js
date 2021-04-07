import * as React from 'react';
import firebase from '../Firebase.js';
import h from '../globals';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, PanResponsder, ImageBackground } from 'react-native';
import { AuthContext } from '../AuthContext';
import { AppContext } from '../AppContext';
// import { TextInput } from 'react-native';
import AppIcons from '../components/AppIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';

export default function SuccessScreen(props) {
    // const user = React.useContext(AuthContext);
    // const hitpause = React.useContext(AppContext);
    // const [userSurveys, setUserSurveys] = React.useState(null);
  


  return (
   <View style={styles.container}>
       <Text style={styles.header}>Thank you for filling out the survey!</Text>
       {/* <Text style={styles.header1}>Thank you for filling out the survey!</Text> */}
       <LottieView style ={styles.animation} source={require('../assets/images/confetti.json')} autoPlay/>
       
       
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  header: {
    fontFamily: 'Poppins-Bold',
    color: h.colors.primary,
    fontSize: RFValue(16),
    alignSelf:'center',
    paddingHorizontal: 20,
    zIndex:999,
    //paddingVertical: '9%',
    paddingTop: 65,
    //paddingBottom: 1
  },
  header1: {
    fontFamily: 'Poppins-Bold',
    color: h.colors.primary,
    fontSize: RFValue(16),
    alignSelf:'center',
    paddingHorizontal: 40,
    zIndex:999,
    //paddingVertical: '9%',
    paddingTop: 65,
    //paddingBottom: 1
  },
  textContainer: {
    // backgroundColor: h.colors.secondary,
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    marginTop: 20,
    height: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(1),
      height: RFValue(5),
    },
    elevation: 3,
    borderRadius: RFValue(15),
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
  },
  animation: {
      height:RFValue(700),
    //    width:'100%',
      alignSelf:'center',
    //   backgroundColor:'rgba(52, 52, 52, 0)'
    backgroundColor:'transparent',
    position:'absolute'
  }


});