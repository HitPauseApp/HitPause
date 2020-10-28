import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View , ScrollView} from 'react-native';
import albumImage from '../assets/images/album-placeholder.png';
import { Modal, Portal, Button, Provider } from 'react-native-paper';


export default function LikesScreen(props) {

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My History</Text>
      <ScrollView>
        <View style={styles.textContainer}>
          <Text style={styles.header2}>Give these suggestions a review!</Text>
          <View style={styles.recentTab}>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.reviewModal}>
                <Image source={albumImage} style={styles.modalImage}></Image>
                <Text style={styles.modalText}>Leave a review!</Text>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={this.state.starCount}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
              </Modal>
            </Portal>
            <TouchableOpacity onPress={showModal}>
              <Image source={albumImage} style={styles.albumImages}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={showModal}>
              <Image source={albumImage} style={styles.albumImages}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={showModal}>
              <Image source={albumImage} style={styles.albumImages}></Image>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.text}>View More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.header2}>Recent Suggestions</Text>
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
          <Text style={styles.header2}>Recently Liked Suggestions</Text>
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
          <Text style={styles.header2}>Most Frequent Suggestions</Text>
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
  header:{
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal:20,
    paddingVertical: '5%',
    marginTop: '7.8%'
  },
  header2:{
    padding: 15,
    fontFamily: 'Poppins-Extra-Light',
    fontSize: 20,
    color: 'white'
  },
  modalText:{
    padding: 15,
    fontFamily: 'Poppins-Extra-Light',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  imgBackground: {
    width: '100%',
    height: '20%'
  },
  recentTab:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  reviewModal:{
    backgroundColor: '#132090',
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    margin: 30,
  },
  albumImages: {
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  modalImage: {
    marginTop: 30,
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  buttonContainer:{
    margin: 10,
    padding: 10
  },
  textContainer: {
    backgroundColor: '#132090',
    marginBottom: 20,
  },
  button:{
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