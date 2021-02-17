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
          email: this.state.email,
          isNewUser: true
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
        <View style = {styles.testing}>
        {!!this.state.errorMessage &&
          <Text style={{marginTop: '5%', color: 'red', left: '9%'}}>
            {this.state.errorMessage}
          </Text>
        }
        <View style = {styles.textbox}>
          <Text style = {styles.textboxTitle}>First Name</Text> 
        <TextInput
          placeholder="Bob"
          placeholderTextColor="#757575"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={firstName => this.setState({ firstName })}
          value={this.state.firstName}
        />
         </View>

         <View style = {styles.textbox}>
          <Text style = {styles.textboxTitle}>Last Name</Text>  
        <TextInput
          placeholder="Marley"
          placeholderTextColor="#757575"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={lastName => this.setState({ lastName })}
          value={this.state.lastName}
        />
        </View>

        <View style = {styles.textbox}>
          <Text style = {styles.textboxTitle}>Email</Text>  
        <TextInput
          placeholder="example123@gmail.com"
          placeholderTextColor="#757575"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        </View>

        <View style = {styles.textbox}>
          <Text style = {styles.textboxTitle}>Password</Text> 
        <TextInput
          secureTextEntry
          placeholder="Enter password"
          placeholderTextColor="#757575"
          //top = '%'
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          />
          </View>

        <View style = {styles.textbox}>
        <Text style = {styles.textboxTitle}>Confirm Password</Text>   
        <TextInput
          secureTextEntry
          placeholder="Re-enter password"
          placeholderTextColor="#757575"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={repeatedPassword => this.setState({ repeatedPassword })}
          value={this.state.repeatedPassword}
        />
        </View>
        

        <TouchableOpacity style={styles.SignUpButton} onPress={this.handleSignUp}>
            <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
        {/* <Text style={styles.text2}>Already have an account?</Text> */}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.text3}>Already have an account? Log in.</Text>
        </TouchableOpacity>
        </View>
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
    padding: '2.5%'
  },
  header:{
    fontSize: RFValue(29.5),
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
    top: '10%'
  },
  testing: {
    backgroundColor: 'white',
    height: '100%',
    width:'105%',
    position: 'absolute',
    top: '23%',
    borderRadius: RFValue(23),
  },
  textInput: {
    width: '80%',
    color: '#757575',
    marginTop: '3.2%',
    left: '5%',
    zIndex: 3,
    alignSelf: 'flex-start'
  },
  SignUpButton: { 
    marginTop: '10%',
    backgroundColor: '#00095e',
    borderRadius: RFValue(50),// 50,
    height: RFValue(40),
    width: RFValue(280),
    justifyContent: 'center',
    alignSelf:'center',
  },
  text: { 
    fontSize: RFValue(16), //22,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },

  textbox: { 
  backgroundColor: 'white',
  width: '84%',
  height: '8%',
  alignSelf: 'center',
  shadowColor:  "#000",
  shadowOffset: {
    width: RFValue(0),
    height: RFValue(2),
  },
  borderRadius: RFValue(15),
  shadowOpacity: 0.25,
  shadowRadius: RFValue(3.84),
  marginTop: '7%',

  elevation: RFValue(1),

  },
  textboxTitle: {
    color: '#00095e',
    fontFamily: 'Poppins-Bold',
    textAlign: 'left',
    left: '5%',
    top: '10%'
  },
  // text2: {
  //   marginTop: RFValue(15),
  //   fontSize: 20,
  //   color: '#00095e',
  //   fontFamily: 'Poppins-Light'
  // },
  text3: {
    fontSize: RFValue(13),
    marginTop: '5%',
    color: '#00095e',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  }
})