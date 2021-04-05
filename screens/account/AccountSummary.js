import * as React from 'react';
import { View, StyleSheet, Text, Image, Button, ScrollView, TouchableOpacity } from 'react-native';
import firebase from '../../Firebase.js';
import h from '../../globals';
import { AuthContext } from '../../AuthContext.js';
import AppIcons from '../../components/AppIcons';
import userImg from '../../assets/images/userImg.png';
import { RFValue } from 'react-native-responsive-fontsize';
import { Rect } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';

export default function Account(props) {
  const user = React.useContext(AuthContext);
  const userImgURI = Image.resolveAssetSource(userImg).uri;
  const [avatar, setAvatar] = React.useState();

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    //Set user avatar
      user.ref.child('avatar').on('value', (s) => {
        if(s.exists()){
          let uri = s.val();
          setAvatar(uri);
        }else{
          setAvatar(userImgURI);
        }
      });
  });

  function handleLogout() {
    firebase.auth().signOut().catch((error) => {
      console.error(error);
    });
  }
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      updateAvatarDB(result.uri);
    }
  };

  const updateAvatarDB = (uri) => {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/avatar`).set(uri);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.screenHeader}>
          <View style={styles.userContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar}></Image>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
              <View style={styles.smallDetails}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AppIcons name="materialicons:email" size={22} color={h.colors.primary} ></AppIcons>
                  <Text style={styles.smallText}>{user.email}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AppIcons name="materialcommunityicons:calendar-month" size={22} color={h.colors.primary} ></AppIcons>
                  <Text style={styles.smallText}>Member since {h.getDate(user.memberSince)}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainter}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: h.colors.primary }]}
            onPress={pickImage}
          >
            <Text style={styles.buttonText}>Edit Avatar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainter}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: h.colors.primary }]}
            onPress={() => props.navigation.navigate('AccountTraits')}
          >
            <Text style={styles.buttonText}>View My Traits</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainter}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: h.colors.primary }]}
            onPress={() => props.navigation.navigate('NotificationsScreen')}
          >
            <Text style={styles.buttonText}>Notification Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainter}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: h.colors.primary }]}
            onPress={() => props.navigation.navigate('BadgeScreen')}
          >
            <Text style={styles.buttonText}>View Badges</Text>
          </TouchableOpacity>
        </View>

        {
          user.isAdmin &&
          <View style={styles.buttonContainter}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: h.colors.accent }]}
              onPress={() => props.navigation.navigate('AdminPanel')}
            >
              <Text style={styles.buttonText}>Admin Panel</Text>
            </TouchableOpacity>
          </View>
        }

        <View style={styles.buttonContainter}>
          <TouchableOpacity style={[styles.button, { backgroundColor: h.colors.primary }]} onPress={() => handleLogout()}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingTop: 100,
    display: 'flex',
    height: '100%'
  },
  userName: {
    color: h.colors.primary,
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(15),
  },
  smallText: {
    color: h.colors.primary,
    fontFamily: 'Poppins-Light',
    fontSize: RFValue(10),
    paddingLeft: 5
  },
  smallDetails: {
    width: '100%',
    flex: 1
  },
  avatar: {
    width: 100,
    height: 100,
  },
  userDetails: {
    flex: 1,
    paddingLeft: 20
  },
  screenHeader: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 20
  },
  userContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row'
  },
  authButton: {
    left: '100%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainter: {
    flex: 1,
    paddingTop: 20
  },
  button: {
    alignSelf: 'center',
    width: '80%',
    padding: 10,
    borderRadius: RFValue(30),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button1: {
    alignSelf: 'center',
    width: '80%',
    padding: 10,
    borderRadius: RFValue(30),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(12)
  },
  buttonText1: {
    color: 'red',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(12)
  }
});