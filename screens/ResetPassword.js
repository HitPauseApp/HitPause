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
      <LinearGradient
        // Background Linear Gradient
          colors={['#EE0979', '#6E00DD']}
          style={styles.gradient}
      />
      <Text style = {styles.header}>Reset Password</Text>
      {!!errorMessage &&
        <Text style={{ color: 'red' }}>
          {errorMessage}
        </Text>}
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Email"
        placeholderTextColor="#ffffff"
        onChangeText={(email) => setEmail(email)}
        value={email}
      />

      <TouchableOpacity style={styles.button1} onPress={() => handleReset()}>
            <Text style={styles.text}>Send Reset Email</Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.button2} onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.text}>Back to Login</Text>
      </TouchableOpacity>
      
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header:{
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'white',
    color: 'white',
    borderBottomWidth: 1,
    marginTop: 20,
    zIndex: 3
  },
  gradient: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -1,
  },
  button1: { 
    marginTop: 30,
    borderWidth: 2,
    borderColor: 'white' ,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 53,
    height: RFValue(20),
    width: RFValue(120),
  },
  button2: { 
    marginTop: 30,
    borderRadius: 20,

  },
  text: { 
    fontSize: 13,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Poppins'

  },
})