// Login.js
import React from 'react'
import firebase from '../Firebase.js'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image, StatusBar, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import NoFillButton from '../components/buttons/NoFillButton';
import { RFValue } from "react-native-responsive-fontsize";
import h from '../globals';

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
      .catch(error => this.setState({ errorMessage: error.message }));
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoHeader}>
          <Image source={require('../assets/images/HitPauseLogo.png')} style={styles.logo} />
        </View>

        <View style={styles.loginForm}>
          <Text style={styles.header}>Login</Text>
          {
            !!this.state.errorMessage &&
            <Text style={{ color: 'red', alignSelf: 'center', marginTop: '4%' }}>
              {this.state.errorMessage}
            </Text>
          }
          <View style={styles.textboxContainer}>
            <View style={styles.textbox}>
              <Text style={styles.textboxTitle}>Email</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Email address"
                placeholderTextColor="#757575"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </View>
            <View style={styles.textbox}>
              <Text style={styles.textboxTitle}>Password</Text>
              <TextInput
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Password"
                placeholderTextColor="#757575"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
              <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgotButton} onPress={() => this.props.navigation.navigate('ResetPassword')}>
              <Text style={styles.forgotText}>Forgot your password?</Text>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <Text style={styles.descText}>Don't have an account?</Text>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: h.colors.primary,
    flex: 1,
    display: 'flex'
  },
  logoHeader: {
    flexBasis: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30
  },
  logo: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  loginForm: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    padding: 10,
    display: 'flex',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  header: {
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(28),
    fontWeight: 'bold',
    color: h.colors.primary,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 8
  },
  textboxContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10
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
  buttonsContainer: {
    flex: 1
  },
  button: {
    backgroundColor: h.colors.primary,
    borderRadius: 30,
    height: RFValue(40),
    width: RFValue(220),
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 8
  },
  forgotButton: {
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: RFValue(16),
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  descText: {
    marginTop: 8,
    fontSize: RFValue(13),
    color: h.colors.primary,
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center'
  },
  forgotText: {
    marginVertical: 8,
    fontSize: RFValue(11),
    color: h.colors.primary,
    fontFamily: 'Poppins-Light',
  },
  line: {
    borderBottomColor: '#D4D5D7',
    borderBottomWidth: 1,
    width: '70%',
    alignSelf: 'center',
    marginVertical: 8
  },
});
