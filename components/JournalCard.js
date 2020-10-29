import React, { Component } from 'react';
import firebase from '../Firebase';
import Swipeout from 'react-native-swipeout';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function JournalCard(props) {

    var swipeoutBtns = [
        {
          text: 'Delete',
          backgroundColor: 'red',
          fontFamily: 'Poppins-Medium'
        }
      ]

    return (

            <Swipeout right={swipeoutBtns} style = {styles.container}>
                    <View style={{height:75}}>
                        <Text style={styles.header}>{props.entry.title}</Text>
                    </View>
                    <View style={{height:75}}>
                        <Text style={styles.bodyText}>{props.entry.text}</Text>
                    </View>
            </Swipeout>   
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#132090',
        //justifyContent: 'center',
        //alignContent: 'center',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        //padding: 10,
        margin: 10,
        height: '100%',
        flex:1
        //position: 'absolute'
    },
    swipe: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        //backgroundColor: '#132090',
        
    },
    header: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        //textAlign: 'left',
        paddingHorizontal: 20,
        paddingVertical: 15,
        flex: 1,
        //height: 150
    },
    bodyText: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        marginTop: 5,
        fontSize: 12,
        textAlign: 'left',
        paddingHorizontal: 20,
        flex:1,
        //height: 150
    }
});
