import React, { Component, useDebugValue } from 'react';
import h from '../globals';
import firebase from '../Firebase';
import Swipeout from 'react-native-swipeout';
//import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import * as GestureHandler from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";


import { StyleSheet, View, Text, TouchableOpacity, Animated, I18nManager } from 'react-native';

// import {SwipeableGesture} from "../screens/SwipeGesture";


const { Swipeable } = GestureHandler;

export default class AppleStyleSwipeGesture extends Component {

  renderRightAction = (text, color, progress) => {
    const trans = progress.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });
    const pressHandler = () => {
      this.close();
      alert(text);
      this.props.deleteEntry()
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  renderRightActions = progress => (
    <View>
      {this.renderRightAction('Delete', '#dd2c00', progress)}
    </View>
  );
  updateRef = ref => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };
  render() {
    const { children } = this.props;
    //let date = {thigetDateAndTime()}
    return (
      <View style={styles.container}>
        <Swipeable
          ref={this.updateRef}
          //friction={2}
          rightThreshold={40}
          renderRightActions={this.renderRightActions}
        >
          {children}

          <TouchableOpacity key={this.props.key} onPress={() => this.props.openEntry()}>
            <View style={{ padding: 20 }}>
              <Text style={styles.titleText}>{this.props.entry.title}</Text>
              <Text style={styles.bodyText}>
                {this.props.entry.text.substr(0, 80)}{this.props.entry.text.length > 80 && "..."}
              </Text>
              <Text style={styles.dateText}>{h.getDate(this.props.entry.dateModified)}</Text>
            </View>
          </TouchableOpacity>
        </Swipeable>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10
  },
  container: {
    backgroundColor: h.colors.secondary,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 10,
    height: '100%',
    flex: 1
  },
  bodyText: {
    color: h.colors.primary,
    fontFamily: 'Poppins-Medium',
    paddingVertical: 10,
    fontSize: RFValue(10),
    flex: 1,
  },
  dateText: {
    color: h.colors.primary,
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(10),
    textAlign: 'right',
    flex: 1,
  },
  titleText: {
    color: h.colors.primary,
    fontFamily: 'Poppins-Medium',
    fontSize: RFValue(15)
  }
});
