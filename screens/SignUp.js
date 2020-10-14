// SignUp.js
import React from 'react'
import firebase from '../Firebase.js'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from "react-native-responsive-fontsize";

export default class SignUp extends React.Component {
  state = { firstName: '', lastName: '', email: '', password: '', repeatedPassword: '', errorMessage: null }

  handleSignUp = () => {
    // TODO: More form validation
    if (this.confirmPassword()) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        // TODO: this is probably broken... investigate?
        // res.user.updateProfile({displayName: `${this.state.firstName} ${this.state.lastName}`});
        firebase.database().ref(`/users/${res.user.uid}`).set({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email
        });
      })
      .catch(error => this.setState({ errorMessage: error.message }));
    }
  }
  confirmPassword = () => {
    if (this.state.password != this.state.repeatedPassword) {
      this.setState({ errorMessage: 'The passwords you entered do not match. Try again!' });
      return false;
    } else {
      this.setState({ errorMessage: '' });
      return true;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.header}>Sign Up</Text>
        {!!this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>
        }
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={firstName => this.setState({ firstName })}
          value={this.state.firstName}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={lastName => this.setState({ lastName })}
          value={this.state.lastName}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          />
        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          placeholderTextColor="#ffffff"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={repeatedPassword => this.setState({ repeatedPassword })}
          value={this.state.repeatedPassword}
        />

        <TouchableOpacity style={styles.SignUpButton} onPress={this.handleSignUp}>
            <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.text2}>Already have an account?</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00095e',
  },
  header:{
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
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
  SignUpButton: { 
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF'  ,
    borderRadius: 50,
    padding: 8,
    overflow: 'hidden' ,
    height: RFValue(40),
    width: RFValue(100),
  },
  loginButton: { 
    borderWidth: 2,
    borderColor: 'white' ,
    borderRadius: 50,
    height: RFValue(30),
    width: RFValue(150),

  },
  text: { 
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins-medium',
    textAlign: 'center',

  },
  text2: {
    marginTop: 15,
    fontSize: 20,
    color: 'white',
    fontFamily: 'Poppins-light'
  },
})