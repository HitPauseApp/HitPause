// Login.js
import React from 'react'
import firebase from '../Firebase.js'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import NoFillButton from '../components/buttons/NoFillButton';
import { RFValue } from "react-native-responsive-fontsize";

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log('handleLogin');
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => this.setState({ errorMessage: error.message }))
      // User redirected to home after signIn
  }
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
            colors={['#B905A2', '#6E00DD']}
            style={styles.gradient}
        />
        <Text style={styles.header}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          placeholderTextColor="#ffffff"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          placeholderTextColor="#ffffff"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />

        <TouchableOpacity style={styles.loginButton} onPress={this.handleLogin}>
            <Text style={styles.text1}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button1} onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.text1}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={() => this.props.navigation.navigate('ResetPassword')}>
            <Text style={styles.text1}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={() => this.props.navigation.navigate('Root')}>
            <Text style={styles.text1}>Skip Auth (Dev)</Text>
        </TouchableOpacity>
      
      </View>
    )
  }
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
  loginButton: { 
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF'  ,
    borderRadius: 50,
    padding: 8,
    overflow: 'hidden' ,
    height: RFValue(20),
    width: RFValue(70),
    textAlign: 'center',
  },
  button1: { 
    marginTop: 30,
    borderWidth: 2,
    borderColor: 'white' ,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 30,
    height: RFValue(20),
    width: RFValue(150),

  },
  button2: { 
    marginTop: 30,
    borderRadius: 20,

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

  text1: { 
    fontSize: 13,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Poppins'

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