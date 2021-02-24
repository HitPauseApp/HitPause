import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import h from '../globals';
import AppIcons from './AppIcons';

export default function BadgeIcon(props) {
  
  return (
    <View>
      <AppIcons name="materialcommunityicons:shield" size={props.size} color={h.colors.tertiary}></AppIcons>
      <View style={styles.interior}>
        { props.icon && <AppIcons name={props.icon} size={props.size / 2}></AppIcons> }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  interior: {
    position: 'absolute',
    height: '100%',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})