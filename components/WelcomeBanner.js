import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default function WelcomeBanner(props) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} imageStyle={{ resizeMode: 'cover', width: 'auto', height: 'auto' }} source={require('../assets/images/homepage.jpg')}>
        <Text style={styles.heading}>Welcome Back,</Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Text style={styles.headerText}>{props.name}!</Text>
          </View>
          {
            props.isAdmin &&
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => props.navigation.navigate('AdminPanel')}
            >
              <Text style={{ color: 'white', fontStyle: 'italic' }}>(ADMIN)</Text>
            </TouchableOpacity>
          }
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    padding: RFValue(10)
  },
  image: {
    borderRadius: 20,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: RFValue(10)
  },
  heading: {
    fontFamily: 'Poppins-Extra-Light',
    color: 'white',
    fontSize: RFValue(18),
    fontWeight: 'bold'
  },
  headerText: {
    fontFamily: 'Poppins-Light',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  }
});
