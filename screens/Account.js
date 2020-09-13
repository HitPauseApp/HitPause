import * as React from 'react';

import {View, StyleSheet, Text} from 'react-native';

export default function Account(){
    return(
        <View style={styles.container}>
            <Text style={styles.heading1}>Username</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#6E00DD'
    },
    heading1:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 25
    },

});