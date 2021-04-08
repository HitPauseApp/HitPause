import React from 'react'
import firebase from '../Firebase.js'
import h from '../globals';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";

export default function SignUp(props) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(null);

  function handleSignUp() {
    // TODO: More form validation
    if (confirmPassword()) {
      firebase.auth().createUserWithEmailAndPassword(email, password1)
        .then((res) => {
          firebase.database().ref(`/users/${res.user.uid}`).set({
            firstName: firstName,
            lastName: lastName,
            email: email,
            isNewUser: true,
            memberSince: Date.now()
          });
        })
        .catch(error => setErrorMessage(error.message));
    }
  }

  function confirmPassword() {
    if (password1 != password2) {
      setErrorMessage('The passwords you entered do not match. Try again!');
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <View style={styles.form}>
          {
            !!errorMessage &&
            <Text style={{ color: h.colors.accent, textAlign: 'center', paddingVertical: 10 }}>
              {errorMessage}
            </Text>
          }
          <View style={styles.textbox}>
            <Text style={styles.textboxTitle}>First Name</Text>
            <TextInput
              placeholder="First"
              placeholderTextColor="#757575"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={(val) => setFirstName(val)}
              value={firstName}
            />
          </View>

          <View style={styles.textbox}>
            <Text style={styles.textboxTitle}>Last Name</Text>
            <TextInput
              placeholder="Last"
              placeholderTextColor="#757575"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={(val) => setLastName(val)}
              value={lastName}
            />
          </View>

          <View style={styles.textbox}>
            <Text style={styles.textboxTitle}>Email</Text>
            <TextInput
              placeholder="Email address"
              placeholderTextColor="#757575"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={(val) => setEmail(val)}
              value={email}
            />
          </View>

          <View style={styles.textbox}>
            <Text style={styles.textboxTitle}>Password</Text>
            <TextInput
              secureTextEntry
              placeholder="Enter password"
              placeholderTextColor="#757575"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={(val) => setPassword1(val)}
              value={password1}
            />
          </View>

          <View style={styles.textbox}>
            <Text style={styles.textboxTitle}>Confirm Password</Text>
            <TextInput
              secureTextEntry
              placeholder="Re-enter password"
              placeholderTextColor="#757575"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={(val) => setPassword2(val)}
              value={password2}
            />
          </View>


          <TouchableOpacity style={[styles.button, { marginTop: 30 }]} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.smallText}>Already have an account? Log in.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: h.colors.primary,
    display: 'flex',
    paddingTop:'30%'
  },
  header: {
    width: '100%',
    fontSize: RFValue(32),
    fontWeight: 'bold',
    color: 'white',
    height: 120,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  form: {
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    padding: 25
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
  buttonText: {
    fontSize: RFValue(16),
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  textbox: {
    backgroundColor: 'white',
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(0),
      height: RFValue(2),
    },
    elevation: 3,
    borderRadius: 25,
    shadowOpacity: 0.18,
    shadowRadius: RFValue(3.84),
    marginVertical: 8,
    display: 'flex',
    padding: 12
  },
  textboxTitle: {
    color: h.colors.primary,
    fontFamily: 'Poppins-Bold',
    textAlign: 'left',
    marginHorizontal:'2%'
  },
  textInput: {
    color: '#757575',
    fontSize: RFValue(12),
    marginTop: 4,
    zIndex: 3,
    marginHorizontal:'2%',
    borderBottomWidth: 1,
    borderColor: h.colors.primary
  },
  smallText: {
    fontSize: RFValue(13),
    marginTop: '5%',
    color: h.colors.primary,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  }
})