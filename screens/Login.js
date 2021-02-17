// Login.js
import React from 'react'
import firebase from '../Firebase.js'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native'
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
    .catch(error => this.setState({ errorMessage: error.message }));
  }
  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.picCont}>
        <Image source={require('../assets/images/HitPauseLogo.png')}
              style= {styles.pic}></Image>
        </View>
        <View style = {styles.testing}>

        
        <Text style={styles.header}>Login</Text>
        {/* Adding !! to try to fix issue #31... expected: login page does not crash */}
        {!!this.state.errorMessage &&
          <Text style={{ color: 'red', alignSelf: 'center', marginTop: '4%' }}>
            {this.state.errorMessage}
          </Text>
        }
        <View style = {styles.textbox}>
        <Text style = {styles.textboxTitle}>Email</Text>   
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email address"
            placeholderTextColor="#757575"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
        />
        </View>
        <View style = {styles.textbox}>
        <Text style = {styles.textboxTitle}>Password</Text> 
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

        <TouchableOpacity style={styles.loginButton} onPress={this.handleLogin}>
          {/* <View style={styles.buttonContainer}> */}
            <Text style={styles.text1}>LOG IN</Text>
          {/* </View>  */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotButton} onPress={() => this.props.navigation.navigate('ResetPassword')}>
            <Text style={styles.text3}>Forgot your password?</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <Text style={styles.text2}>Don't have an account?</Text>
        <TouchableOpacity style={styles.signupButton} onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.text1}>SIGN UP</Text>
        </TouchableOpacity>
        </View>
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
    padding: '2.5%'
  },
  picCont: {
    height: '80%',
    width: '80%',

},
  pic: {
      height: '25%',
      width: '50%',
      alignSelf: 'center'
  },
  header:{
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(29.5), // 40
    fontWeight: 'bold',
    color: '#00095e',
    // left: '5%',
    top: '2%',
    alignSelf: 'center'
  },
  loginButton: { 
    marginTop: '10.5%',
    backgroundColor:'#00095e',
    borderRadius: RFValue(30),
    overflow: 'hidden' ,
    height: RFValue(40),
    width: RFValue(220),
    justifyContent: 'center',
    alignSelf:'center'
  },
  signupButton: {
    backgroundColor:'#00095e',
    borderRadius: RFValue(50),
    height: RFValue(40),
    width: RFValue(220),
    justifyContent: 'center',
    alignSelf:'center',
    marginTop: '3%'

  },
  forgotButton: { 
    //borderRadius: 20,
    alignSelf:'center',
    marginTop: '2.3%'
  },
  textInput: {
    width: '80%',
    color: '#757575',
    marginTop: '3.2%',
    left: '5%',
    zIndex: 3,
    alignSelf: 'flex-start'
  },
  text1: { 
    fontSize: RFValue(16),
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  text2: {
    marginTop: '8%',
    fontSize: RFValue(13),
    color: '#00095e',
    fontFamily: 'Poppins-Bold',
    alignSelf:'center'
  },
  text3: {
    marginTop: '3%',
    fontSize: RFValue(11),
    color: '#00095e',
    fontFamily: 'Poppins-Light',
    
  },
  buttonContainer: {
    height:'100%',
    width: '100%',
  },
  testing: {
    backgroundColor: 'white',
    height: '70%',
    width:'105%',
    position: 'absolute',
    top: '33%',
    borderRadius: RFValue(23),
  },
  line: {
    borderBottomColor: '#D4D5D7',
    borderBottomWidth: RFValue(1),
    width: '70%',
    alignSelf: 'center',
    marginTop: '8%'
  },
  textbox: { 
    backgroundColor: 'white',
    width: '84%',
    height: '10%',
    alignSelf: 'center',
    shadowColor:  "#000",
    shadowOffset: {
      width: RFValue(0),
      height: RFValue(2),
    },
    borderRadius: RFValue(15),
    shadowOpacity: 0.18,
    shadowRadius: RFValue(3.84),
    marginTop: '8%',
  
    elevation: RFValue(1),
  
    },
    textboxTitle: {
      color: '#00095e',
      fontFamily: 'Poppins-Bold',
      textAlign: 'left',
      left: '5%',
      top: '10%'
    },

})