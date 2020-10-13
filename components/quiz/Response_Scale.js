import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function Response_Scale(props){
  // TODO: The following is a temporary solution, eventually we'll want to use an actual scale element
  let options = [];
  let scaleLow = props.scaleLow || 0;
  for (let i = scaleLow; i < props.scaleHigh + 1; i += 1) {
    options.push(i);
  }
  return(
    <View style={styles.quizQuestion}>
      <RadioButton.Group onValueChange={value => props.onChange(value)} value={props.value}>
        {
          // TODO: Use RadioButton.Item
         options.map((item, key) =>
            <View style={styles.checkItem} key={key}>
              <RadioButton
                value={item}
                status={props.value === item ? 'checked' : 'unchecked'}
              />
              <Text style={styles.checkText}>{item}</Text>
            </View>
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
    flexDirection: "row",
    alignSelf: "center"
  },
  checkText: {
    marginTop: 10
  }
});