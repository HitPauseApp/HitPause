// Login.js
import React, { useState }from 'react'
import firebase from '../Firebase.js'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

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
      <Text>Reset Password</Text>
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
      <Button
        title="Send Reset Email"
        onPress={() => handleReset()}
      />
      <Button
        title="Back to Login"
        onPress={() => props.navigation.navigate('Login')}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
})