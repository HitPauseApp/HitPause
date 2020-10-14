import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

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
            <View style={styles.checkItem} key={key}>
              <RadioButton
                value={item.score}
                status={props.value === item.score ? 'checked' : 'unchecked'}
              />
              <Text style={styles.checkText}>{item.text}</Text>
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