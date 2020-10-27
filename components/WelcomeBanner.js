import React, { Component } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import user from '../assets/images/user.png';

export default function WelcomeBanner(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome Back,</Text>
            <Text style={styles.header}>{props.name}!</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        width: '80%',
        paddingLeft: 10,
        position: 'absolute',
        bottom: '50%',
        overflow: 'hidden'
    },
    text: {
        fontFamily: 'Poppins-Extra-Light',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    header: {
        fontFamily: 'Poppins-Light',
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',

    },

});
