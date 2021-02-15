// Login.js
import React, { useState }from 'react'
import firebase from '../Firebase.js'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from "react-native-responsive-fontsize";

export default function ResetPassword(props) {
  const [email, setEmail] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(false);

  const handleReset = () => {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      console.log('Email sent');
    }).catch((error) => {
      setErrorMessage(error);
    });
  }

  return (
    <View style={styles.container}>
      {/* <View style = {styles.testing}> */}
      <Text style = {styles.header}>Reset Password</Text>
      <View style ={styles.textHolder}>
        <Text style = {styles.bodyText}>Enter the email address associated with your account and we will
        send you an email with the instructions to reset your password.</Text>
      </View>
     
      {!!errorMessage &&
        <Text style={{ color: 'red' }}>
          {errorMessage}
        </Text>}

      <View style = {styles.textbox}>
      <Text style = {styles.textboxTitle}>Email</Text> 
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Enter email address"
        placeholderTextColor="#757575"
        onChangeText={(email) => setEmail(email)}
        value={email}
      />
      </View>

      <TouchableOpacity style={styles.button1} onPress={() => handleReset()}>
            <Text style={styles.text}>Send Reset Email</Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.button2} onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.text2}>Back to Login</Text>
      </TouchableOpacity>
      {/* </View> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  testing: {
    backgroundColor: 'white',
    height: '60%',
    width:'90%',
    position: 'absolute',
    alignSelf:'center',
    //borderRadius: RFValue(30),//30,
  },
  header:{
    fontSize: RFValue(22),
    fontWeight: 'bold',
    color: '#00095e',
    fontFamily: 'Poppins-Medium',
    marginTop: '32%',
    left: '7%'
  },
  textHolder: {
    width: '90%',
    alignSelf:'center'
  },
  bodyText: {
    fontSize:RFValue(11),
    color: '#00095e',
    fontFamily: 'Poppins-Medium',
    marginTop: '7%',
    left: '2%'
  },
  textInput: {
   // height: '',
    width: '90%',
    color: '#00095e',
    marginTop: '3.2%',
    zIndex: 3,
    left: '5%'
  },
  button1: { 
    marginTop: '10%',
    //textAlign:'center',
    backgroundColor: '#00095e',
    justifyContent: 'center',
    //borderWidth: 2,
    //borderColor: '#00095e' ,
    borderRadius: RFValue(15.5), //20,
    height: RFValue(37),
    width: RFValue(145),
    alignSelf:'flex-end',
    right: '5%'
    
  },
  // button2: { 
  //   marginTop: 30,
  //   //borderRadius: 50,
  //   //backgroundColor: '#00095e',
  //   height: RFValue(37),
  //   width: RFValue(145),
  //   justifyContent: 'center',
  // },
  text: { 
    textAlign: 'center',
    fontSize: RFValue(11),
    color: 'white',
    fontFamily: 'Poppins-Bold'

  },
  text2: { 
    fontSize: RFValue(11),
    color: '#00095e',
    fontFamily: 'Poppins-Bold',
    marginTop:'20%',
    alignSelf:'center'

  },
  textbox: { 
    backgroundColor: 'white',
    width: '88%',
    height: '7%',
    alignSelf: 'center',
    shadowColor:  "#000",
    shadowOffset: {
      width: RFValue(0),
      height: RFValue(2),
    },
    borderRadius: RFValue(15),
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
    marginTop: '8%',
  
    elevation: RFValue(1),
  
    },
    textboxTitle: {
      color: '#00095e',
      fontFamily: 'Poppins-Bold',
      textAlign: 'left',
      left: '5%',
      top: '10%'
    },
})