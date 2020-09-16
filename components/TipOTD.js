import React, {Component} from 'react';

import { StyleSheet, View, Text} from 'react-native';

export default class TipOTD extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Tip of the Day</Text>
                <Text style={styles.bodyText}>{this.props.TOTD}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10
    },
    header:{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bodyText:{
        marginTop: 5,
        textAlign: 'center'
    },
});
