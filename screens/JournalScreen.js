import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../AuthContext';
import JournalCard from '../components/JournalCard';

export default function JournalScreen(props) {
  const user = React.useContext(AuthContext);
  const onPress = () => props.navigation.navigate("HomeScreen");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>My Journal</Text>

          {/* <Image style={ styles.imgBackground }  
                  source={require('../assets/images/shapeDesign1.png')}>
          </Image> */}

      {
        !!user.journal && Object.values(user.journal).length > 0 ? (
          Object.values(user.journal).map((item, key) =>
            <JournalCard entry={item} key={key}></JournalCard>
          )
        ) : (
          <Text>Nothing here yet. Add your first journal entry below!</Text>
        )
      }

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image style={ styles.imgBackground }  
                  source={require('../assets/images/pencilTip.png')}>
          </Image>
        </TouchableOpacity>
      </View>
     
    </ScrollView>

   


  // <OptionButton
  //       icon="md-school"
  //       label="Read the Expo documentation"
  //       onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
  //     />

  //     <OptionButton
  //       icon="md-compass"
  //       label="Read the React Navigation documentation"
  //       onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
  //     />

  //     <OptionButton
  //       icon="ios-chatboxes"
  //       label="Ask a question on the forums"
  //       onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
  //       isLastOption
  //     /> 
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00095e',
    //justifyContent: "center",
    flex: 1,
    vertical: true
  },
  header: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row-reverse',
    right: 20,
    bottom: -100
    
  },
  addButton: {
    color: 'white',
    fontSize: 25,
    paddingVertical: 3,
    paddingHorizontal: 13
  },
  button:{
    backgroundColor: 'white',
    //bottom: -15,
    //right: -40,
    width: 55,
    height: 55,
    borderRadius: 55/2,
    //borderWidth: 2,
    flexBasis: 'column',
    borderColor: 'white'
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  imgBackground: {
    width: '70%',
    height: '70%',
    bottom: -7,
    right: -7

    //alignSelf: 'left',
    //resizeMode: 'cover',
    //position: 'center',
    //top: 20,
},
  imageContainer: {
    backgroundColor: '#00095e',
    flex: 1,
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  }
});
