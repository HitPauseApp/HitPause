import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { RFValue } from "react-native-responsive-fontsize";

export default function Response_Scale(props){
  // TODO: The following is a temporary solution, eventually we'll want to use an actual scale element
  let options = [];
  let scaleLow = props.scaleLow || 1;
  for (let i = scaleLow; i < props.scaleHigh + 1; i += 1) {
    options.push(i);
  }

  const onChange = (value) => {
    let flags = {};
    for (const key in props.flagChanges) {
      if (key == value) {
        flags = {...props.flagChanges[key]};
        break;
      }
    }
    props.onChange(value, flags);
  }

  return(
    <View style={styles.quizQuestion}>
      <RadioButton.Group onValueChange={value => onChange(value)} value={props.value}>
        {
          // TODO: Use RadioButton.Item
          options.map((item, key) =>
          <TouchableOpacity 
            style = {styles.checkBoxDesign}
            onPress={value => onChange(item)}
            key={key}
          >
            <View style={styles.checkItem}>
              <RadioButton
                value={item}
                status={props.value === item ? 'checked' : 'unchecked'}
              />
              <Text style={styles.checkText}>{item}</Text>
            </View>
          </TouchableOpacity>
          )
        }
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#48484A",
    textAlign: "center"
  },
  checkItem: {
    marginTop: '1.2%',
    flexDirection: "row",
    alignSelf: "center"
  },
  checkText: {
    marginTop: 10,
    color: 'black'
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