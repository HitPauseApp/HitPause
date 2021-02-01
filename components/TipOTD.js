import React, {Component} from 'react';

import { StyleSheet, View, Text} from 'react-native';

const getQOTDFromApi = async () => {
    try {
      let response = await fetch('https://zenquotes.io/api/today')
      return response;
    } catch (error) {
       console.error(error);
    }
};



export default class TipOTD extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Quote of the Day</Text>
                <Text style={styles.bodyText}>{getQOTDFromApi}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#132090',
        justifyContent: 'center',
        alignContent: 'center',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        bottom: 10,
        margin: 10
    },
    header:{
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: 24,
        textAlign: 'center'
    },
    bodyText:{
        color: 'white',
        fontFamily: 'Poppins-Extra-Light',
        marginTop: 5,
        textAlign: 'center',
    },
});
