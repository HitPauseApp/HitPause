import React from 'react';
import firebase from '../Firebase.js';
import h from '../globals';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
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
      <Text style={styles.header}>Reset Password</Text>
      <Text style={styles.bodyText}>Enter the email address associated with your account and we will send you an email with the instructions to reset your password.</Text>

      {!!errorMessage &&
        <Text style={{ color: 'red' }}>
          {errorMessage}
        </Text>}

      <View style={styles.textbox}>
        <Text style={styles.textboxTitle}>Email</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Enter your account email address"
          placeholderTextColor="#757575"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleReset()}>
        <Text style={styles.buttonText}>Send Reset Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ paddingTop: 30 }} onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.smallButtonText}>Back to Login</Text>
      </TouchableOpacity>
      {/* </View> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 100
  },
  header: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    color: h.colors.primary,
    fontFamily: 'Poppins-Medium',
  },
  bodyText: {
    fontSize: RFValue(11),
    color: h.colors.primary,
    fontFamily: 'Poppins-Medium',
    paddingVertical: 16
  },
  button: {
    backgroundColor: h.colors.primary,
    borderRadius: 30,
    height: RFValue(40),
    width: RFValue(220),
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 16
  },
  buttonText: {
    fontSize: RFValue(13),
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  smallButtonText: {
    fontSize: RFValue(11),
    color: h.colors.primary,
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center'
  },
  textbox: {
    backgroundColor: 'white',
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(0),
      height: RFValue(2),
    },
    borderRadius: 25,
    shadowOpacity: 0.18,
    shadowRadius: RFValue(3.84),
    elevation: 3,
    marginVertical: 8,
    display: 'flex',
    padding: 12
  },
  textboxTitle: {
    color: h.colors.primary,
    fontFamily: 'Poppins-Bold',
    textAlign: 'left',
  },
  textInput: {
    color: '#757575',
    fontSize: RFValue(14),
    marginTop: 4,
    zIndex: 3
  },
})