import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet, ImagePropTypes } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { RFValue } from "react-native-responsive-fontsize";

export default function Response_Checkbox(props) {
  const onChange = (score) => {
    let oldValue = Array.isArray(props.value) ? [...props.value] : [];
    let newValue = [];
    let flags = {};
    // Handle "uncheck" case
    if (oldValue.length > 0 && oldValue.indexOf(score) >= 0) {
      oldValue.splice(oldValue.indexOf(score), 1);
      newValue = oldValue.splice(0);
    // Handle "check" case
    } else {
      newValue = [...oldValue, score];
    }
    // Get flag changes
    for (const key in props.responses) {
      if (newValue.includes(props.responses[key].score)) {
        for (const flagKey in props.responses[key].flagChanges) {
          // When flags compound within the same question
          if (Object.keys(flags).includes(flagKey)) {
            flags[flagKey] = parseFloat(flags[flagKey]) + parseFloat(props.responses[key].flagChanges[flagKey]);
          // Otherwise, add normally
          } else {
            flags[flagKey] = parseFloat(props.responses[key].flagChanges[flagKey]);
          }
        }
      }
    }
    props.onChange(newValue, flags);
  }

  return (
    <View>
      {
        Object.values(props.responses).map((item, key) =>
          
            
            <TouchableOpacity 
              style = {styles.checkBoxDesign}
              onPress={() => onChange(item.score)}>
              <View style={styles.checkItem} key={key}>
            <Checkbox
              style = {styles.checkBox}
              key={key}
              status={Array.isArray(props.value) && props.value.indexOf(item.score) >= 0 ? 'checked' : 'unchecked'}
              onPress={() => onChange(item.score)}
            />
            <Text style={styles.checkText}>{item.text}</Text>
            </View>
            </TouchableOpacity>
          
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#48484A",
    textAlign: "center"
  },
  checkItem: {
    marginTop: '2%',
    flexDirection: "row",
    alignSelf: "center",
    color: 'black',
   
  },
  checkBox: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
  },
  checkText: {
    marginTop: 7,
    color: '#00095e',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    fontWeight: 'bold',
  },
  checkBoxDesign: {
    marginTop: 15,
    borderWidth: 2,
    alignSelf: "center",
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    height: RFValue(40),
    width: RFValue(260), //260
  },
});