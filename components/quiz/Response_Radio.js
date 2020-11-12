import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function Response_Radio(props) {
  const onChange = (value) => {
    let flags = {};
    for (const key in props.responses) {
      if (props.responses[key].id == value) {
        flags = { ...props.responses[key].flagChanges };
        break;
      }
    }
    props.onChange(value, flags);
  }
  return (
    <View>
      <RadioButton.Group onValueChange={value => onChange(value)} value={props.value}>
        {
          Object.values(props.responses).map((item, key) =>
            <RadioButton.Item
              label={item.text}
              labelStyle={{color: '#00095e'}}
              style={styles.radioButton}
              color="#00095e"
              value={item.id}
              key={key}
            />
          )
        }
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  radioButton: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    width: '80%'
  },
});