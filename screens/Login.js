// Login.js
import React from 'react'
import firebase from '../Firebase.js'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import NoFillButton from '../components/buttons/NoFillButton';
import { RFValue } from "react-native-responsive-fontsize";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null 
    }
  }
  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log('handleLogin');
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch(error => this.setState({ errorMessage: error.message }))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>
        }
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
        <TouchableOpacity style={styles.forgotButton} onPress={() => this.props.navigation.navigate('ResetPassword')}>
            <Text style={styles.text3}>Forgot your password?</Text>
        </TouchableOpacity>
        <Text style={styles.text2}>Don't have an account?</Text>
        <TouchableOpacity style={styles.signupButton} onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.text1}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00095e',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  header:{
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  loginButton: { 
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50,
    overflow: 'hidden' ,
    height: RFValue(30),
    width: RFValue(100),
    // textAlign: 'center',
  },
  signupButton: { 
    // textAlign: 'center',
    borderWidth: 2,
    borderColor: 'white' ,
    borderRadius: 50,
    height: RFValue(30),
    width: RFValue(150),

  },
  forgotButton: { 
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
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center'
  },
  text2: {
    marginTop: 15,
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins-Thin'
  },
  text3: {
    marginTop: 5,
    fontSize: 15,
    color: 'white',
    fontFamily: 'Poppins-Thin'
  }
})