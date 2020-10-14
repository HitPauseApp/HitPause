import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
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

    <View style={styles.container}>
      <View style={styles.contentContainer}> 
         <ScrollView>
              <Text style={styles.header}>My Journal</Text>
      {
        !!user.journal && Object.values(user.journal).length > 0 ? (
          Object.values(user.journal).map((item, key) =>
            <JournalCard entry={item} key={key}></JournalCard>)
        ) : (
          <View style={styles.textContainer}>
              <Text style={styles.text}>Nothing here yet. Add your first journal entry below!</Text>
          </View>
        )
      }
          </ScrollView>
      </View>
      {/* <View style={styles.pic} >
          <ImageBackground style={styles.img}  
                source={require('../assets/images/shapeDesign2.png')} resizeMode="contain">
          </ImageBackground>
       </View> */}

       {/* <View style={styles.pic2} >
          <ImageBackground style={styles.img}  
                source={require('../assets/images/shapeDesign3.png')} resizeMode="contain">
          </ImageBackground>
       </View> */}

      
        <View style={styles.buttonView}>
           <TouchableOpacity style={styles.button1} onPress={() => props.navigation.navigate('JournalEntry')}>
               <Image style={ styles.imgBackground }  
                     source={require('../assets/images/pencilTip.png')}> 
               </Image>
           </TouchableOpacity>
      </View>

       <View style = {styles.buttonView2}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                 <FontAwesome name="trash-o" size={40} color="white" />
            </TouchableOpacity>
       </View>

        
      </View>
    

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00095e',
    //justifyContent: "center",
    flex: 1,
    // [TOS] This line below is throwing an error
    // vertical: true
  },
  header: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  pic: {
    flex: 1,
    flexDirection: 'row',
    bottom: '30%',
  },
  pic2: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  contentContainer: {
    paddingTop: 15,
    flex: 1
  },
  button1:{
    backgroundColor: 'white',
    width: 55,
    height: 55,
    borderRadius: 55/2,
    flexBasis: 'column',
    borderColor: 'white'
  },
  button2: {
    flexBasis: 'column'

  },
  textContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    bottom: 10,
    marginTop: 20
  },
  img: {
    width: '50%',
    height: '50%',
  },
  imgBackground: {
    width: '70%',
    height: '70%',
    bottom: -7,
    right: -7
},
buttonView: {
  flex: 1,
  flexDirection: 'row-reverse',
  right: '8%',
  bottom: '3%',
  position: 'absolute'
},
buttonView2: {
    flex: 1,
    bottom: '4%',
    left: '8%',
    position: 'absolute',
    //flexDirection: 'row'
},
  text: {
    textAlign: 'center',
    color: '#00095e',
    fontFamily: 'Poppins-extra-light',
    fontWeight: 'bold',
    fontSize: 20,
  },
  // button: {
  //   alignSelf: 'center',
  //   marginTop: 20,
  // },
  contentContainer: {
    paddingTop: 15,
    flex: 1
  },

});
