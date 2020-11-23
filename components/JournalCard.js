import React, { Component, useDebugValue } from 'react';
import firebase from '../Firebase';
import Swipeout from 'react-native-swipeout';
//import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import * as GestureHandler from 'react-native-gesture-handler'; 

import { StyleSheet, View, Text, TouchableOpacity, Animated, I18nManager } from 'react-native';

// import {SwipeableGesture} from "../screens/SwipeGesture";


const {Swipeable} = GestureHandler;

export default class AppleStyleSwipeGesture extends Component { 

  getDateAndTime(epoch) {
    let date = new Date(epoch);
    let dateString = `${date.getMonth() + 1}/${date.getDate()}/${String(date.getFullYear()).substr(2)}`;
    let timeString = `${date.getHours() == 0 ? '12' : (date.getHours() % 12)}:${String(date.getMinutes()).padStart(2, '0')}`;
    let amPmString = date.getHours() < 12 ? 'AM' : 'PM';
    return `${dateString}\n${timeString} ${amPmString}`;
  }

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
          <Animated.View style={{flex: 1, transform: [{ translateX: trans}] }}>
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
          {this.renderRightAction('Delete', '#dd2c00',progress)}
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
            <View style = {styles.container}>
                <Swipeable
                    ref={this.updateRef}
                    //friction={2}
                    rightThreshold={40}
                    renderRightActions={this.renderRightActions}
                    >
                    {children}
                    
                    <TouchableOpacity key={this.props.key} onPress={() => this.props.openEntry()}>  
                    <View style={{height:150}}>
                        <Text style = {styles.titleText}>{this.props.entry.title}</Text>
                        <Text style = {styles.bodyText}>{this.props.entry.text}</Text>
                        <Text style = {styles.dateText}>{this.getDateAndTime(this.props.entry.dateModified)}</Text>
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
        backgroundColor: '#132090',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        margin: 10,
        height: '100%',
        flex:1
    },
    bodyText: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        marginTop: '5%',
        fontSize: 12,
        textAlign: 'left',
        left: '5%',
        flex:1,
        padding: 10 
        //height: 150
   },     
   dateText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    marginTop: '5%',
    fontSize: 12,
    textAlign: 'right',
    right: '5%',
    flex:1,
    padding: 10 
    
   },
   titleText: {
       color: 'white',
       fontFamily:'Poppins-Medium',
       fontSize: 18,
       marginTop: '5%',
       left: '5%'
   }
  });
