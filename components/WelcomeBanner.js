import * as React from 'react';
import h from '../globals';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default function WelcomeBanner(props) {
  return (
    <View style={styles.container}>
      {/* <ImageBackground style={styles.image} imageStyle={{ resizeMode: 'cover', width: 'auto', height: 'auto' }} source={require('../assets/images/homepage.jpg')}> */}
      <View style = {styles.image}> 
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
        </View>
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    //padding: RFValue(10)
  },
  image: {
    borderRadius: RFValue(15),
    width: '100%',
    height: '100%',
    //overflow: 'hidden',
    //display: 'flex',
    alignSelf: 'center',
    //justifyContent: 'flex-end',
    //padding: RFValue(10)
  },
  heading: {
    fontFamily: 'Poppins-Light',
    color: h.colors.primary,
    fontSize: RFValue(18),
    fontWeight: 'bold',
    marginTop: '15%',
    left: '5%'
  },
  headerText: {
    fontFamily: 'Poppins-Medium',
    color: h.colors.primary,
    fontSize: RFValue(18),
    fontWeight: 'bold',
    left: '20%'
  }
});
