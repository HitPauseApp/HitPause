import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { RFValue } from "react-native-responsive-fontsize";

export default function Response_Radio(props) {
  const onChange = (value) => {
    let flags = {};
    for (const key in props.responses) {
      if (props.responses[key].score == value) {
        flags = {...props.responses[key].flagChanges};
        break;
      }
    }
    props.onChange(value, flags);
  }
  return (
    <View style={styles.quizQuestion}>
      <RadioButton.Group onValueChange={value => onChange(value)} value={props.value}>
        {
          // TODO: Use RadioButton.Item
          Object.values(props.responses).map((item, key) =>
          <TouchableOpacity 
              style = {styles.checkBoxDesign}
              onPress={value => onChange(item.score)}>
            <View style={styles.checkItem} key={key}>
                <RadioButton
                    value={item.score}
                    status={props.value === item.score ? 'checked' : 'unchecked'}
                />
                <Text style={styles.checkText}>{item.text}</Text>
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
    alignSelf: "center",
    color: 'black',
  },
  checkText: {
    marginTop: 10,
    color: '#00095e'
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