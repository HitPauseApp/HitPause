import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import albumImage from '../assets/images/album-placeholder.png';
import WelcomeBanner from '../components/WelcomeBanner';
import {Portal, Modal} from 'react-native-paper';

export default function LikesScreen() {

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header2}>My History</Text>
      <ScrollView>
        <View style={styles.textContainer}>
          <Text style={styles.header}>Give these suggestions a review!</Text>
          <View style={styles.recentTab}>
            <Image source={albumImage} style={styles.albumImages}></Image>
            <Image source={albumImage} style={styles.albumImages}></Image>
            <Image source={albumImage} style={styles.albumImages}></Image>
          </View>
          <TouchableOpacity>
            <Text style={styles.text}>View More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.header}>Recent Suggestions</Text>
          <View style={styles.recentTab}>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal}>
                <Text>Example Modal</Text>
              </Modal>
            </Portal>
            <TouchableOpacity onPress={showModal}>
                <Image source={albumImage} style={styles.albumImages}></Image>
              </TouchableOpacity>
            <Image source={albumImage} style={styles.albumImages}></Image>
            <Image source={albumImage} style={styles.albumImages}></Image>
            <Image source={albumImage} style={styles.albumImages}></Image>
          </View>
          <TouchableOpacity>
            <Text style={styles.text}>View More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.header}>Recently Liked Suggestions</Text>
          <View style={styles.recentTab}>
            <Image source={albumImage} style={styles.albumImages}></Image>
            <Image source={albumImage} style={styles.albumImages}></Image>
            <Image source={albumImage} style={styles.albumImages}></Image>
          </View>
          <TouchableOpacity>
            <Text style={styles.text}>View More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.header}>Most Frequent Suggestions</Text>
          <View style={styles.recentTab}>
            <Image source={albumImage} style={styles.albumImages}></Image>
            <Image source={albumImage} style={styles.albumImages}></Image>
            <Image source={albumImage} style={styles.albumImages}></Image>
          </View>
          <TouchableOpacity>
            <Text style={styles.text}>View More</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00095e',
    flex: 1
  },
  header2: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: '5%',
    marginTop: '7.8%'
  },
  header: {
    padding: 15,
    fontFamily: 'Poppins-Extra-Light',
    fontSize: 20,
    color: 'white'
  },
  imgBackground: {
    width: '100%',
    height: '20%'
  },
  recentTab: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  albumImages: {
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  buttonContainer: {
    margin: 10,
    padding: 10
  },
  textContainer: {
    backgroundColor: '#132090',
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#132090',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 8
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Extra-Light',
    padding: 15
  },

});