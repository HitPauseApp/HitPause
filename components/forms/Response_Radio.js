import * as React from 'react';
import h from '../../globals';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Response_Radio(props) {
  const onChange = (id) => {
    let flags = {};
    for (const key in props.responses) {
      if (key == id) {
        flags = { ...props.responses[key].effects };
        break;
      }
    }
    props.onChange(id, flags);
  }
  return (
    <View style={{ paddingTop: 10, paddingHorizontal: 30 }}>
      <RadioButton.Group onValueChange={value => onChange(value)} value={String(props.value)}>
        {
          Object.values(props.responses).map((item, key) =>
            <RadioButton.Item
              label={item.text}
              labelStyle={{color: h.colors.primary}}
              style={styles.radioButton}
              color={h.colors.primary}
              value={String(key)}
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
    backgroundColor: h.colors.secondary,
    borderRadius: 999,
    alignSelf: 'center',
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(1),
      height: RFValue(3),
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
    elevation: 3
  },
});