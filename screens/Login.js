// Login.js
import React from 'react'
import firebase from '../Firebase.js'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import NoFillButton from '../components/buttons/NoFillButton';

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log('handleLogin');
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Root'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
            colors={['#3494E6', '#EC6EAD']}
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
        <Button style={styles.button}
            title="Login" 
            onPress={this.handleLogin}
        />
        <Button style={styles.button}
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
        <Button style={styles.button}
          title="Forgot your password?"
          onPress={() => this.props.navigation.navigate('ResetPassword')}
        />
        <Button style={styles.button}
          title="Skip Auth (Dev)"
          onPress={() => this.props.navigation.navigate('Root')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  header:{
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
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