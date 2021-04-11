import * as React from 'react';
import { View, StyleSheet, Text, Image, Button, ScrollView } from 'react-native';
import firebase from '../../Firebase.js';
import h from '../../globals';
import { AuthContext } from '../../AuthContext.js';
import { AppContext } from '../../AppContext.js';
import { RFValue } from 'react-native-responsive-fontsize';

export default function AccountTraits(props) {
  const user = React.useContext(AuthContext);
  const hitpause = React.useContext(AppContext);
  const [userTraits, setUserTraits] = React.useState([]);

  // Firebase calls to make on component load
  React.useEffect(() => {
    user.ref.child('profile/traits').on('value', (s) => {
      if (s.exists()) setUserTraits(Object.keys(s.val()));
      else setUserTraits([]);
    });    
  }, []);

  function renderTrait(t, i) {
    let trait = hitpause.traits[t];
    console.log('trait -->', trait);
    if (trait) return (
      <Text style={styles.traits} key={i}>{trait.name}</Text>
    )
    else return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>After you took the initial survery, these were some of the things we learned about you:</Text>
      </View>
      {/* <View>
        <Text>User Traits</Text>
      </View> */}
      
      <ScrollView>
        <View style={styles.traitContainer}>
          {/* <Text > */}
            
            {             
                userTraits.map(renderTrait) 
            } 
          {/* </Text> */}
        </View> 
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
container:{
  backgroundColor: "white",
  height:'100%',
  width:'100%',

},
headerContainer: {
  //backgroundColor:'yellow', 
  width:'90%',
  alignSelf:'center',
  paddingTop: 30,
  paddingBottom: 20,
},
traitContainer:{
  //flexDirection: 'column'
  flex:1,
  paddingTop:30,
  alignSelf:'flex-start',
  height:'100%',
  paddingLeft:'10%'
  
},
traits: {
  fontFamily: 'Poppins-Medium',
  color:h.colors.primary,
  fontSize: RFValue(18),
  paddingBottom:'3%'
  
},
header: {
  fontFamily: 'Poppins-Bold',
  color:h.colors.primary,
  fontSize: RFValue(18),
}
});