// SignUp.js
import React from 'react'
import firebase from '../Firebase.js'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default class SignUp extends React.Component {
  state = { firstName: '', lastName: '', email: '', password: '', repeatedPassword: '', errorMessage: null }

  handleSignUp = () => {
    // TODO: More form validation
    if (this.confirmPassword()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.updateProfile({displayName: `${this.state.firstName} ${this.state.lastName}`});
          firebase.database().ref(`/users/${res.user.uid}`).set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
          });
          this.props.navigation.navigate('Root');
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
        <LinearGradient
          // Background Linear Gradient
          colors={['#B905A2', '#6E00DD']}
          style={styles.gradient}
        />
        <Text style = {styles.header}>Sign Up</Text>
        {!!this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
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
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
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