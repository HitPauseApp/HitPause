import * as React from 'react';
import h from '../globals'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import SuggestionSwitcher from './forms/SuggestionSwitcher';
import { RFValue } from 'react-native-responsive-fontsize';
import AppIcons from './AppIcons.js';

export default function SuggestionCard(props) {
  let buttonText = props.buttonText || 'I will try this:';
  return (
    <View style={[styles.card]}>
      {
        !!props.bigNumber ? (
          <View style={{ position: 'absolute', top: -30, left: -10, right: 0 }}>
            <Text style={styles.bigNumber}>#{props.suggestionNumber}</Text>
            <Text style={styles.bigNumberNote}>Top Suggestion!</Text>
          </View>
        ) : (
          !!props.suggestionNumber && <Text style={styles.smallNumber}>#{props.suggestionNumber}</Text>
        )
      }
      <View style={styles.titleHolder}>
        <AppIcons name={props.suggestion.icon} size={RFValue(36)} color={h.colors.primary}></AppIcons>
        <Text style={styles.cardTitle}>{props.suggestion.text}</Text>
      </View>
      <View>
        <Text style={{ fontSize: RFValue(12), paddingVertical: 10, fontFamily: 'Poppins-Medium', color: h.colors.primary }}>{props.suggestion.body}</Text>
        <SuggestionSwitcher suggestionId={props.suggestion.$key}></SuggestionSwitcher>
      </View>
      {
        !!props.handleSuggestionSelect &&
        <TouchableOpacity style={styles.button} onPress={() => props.handleSuggestionSelect(props.suggestion.$key)}>
          <Text style={styles.buttonText}>{buttonText} {props.suggestion.text}</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    position: 'relative',
    alignContent: 'center',
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(1),
      height: RFValue(3),
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
    elevation: 3,
    backgroundColor: h.colors.secondary,
    borderRadius: RFValue(20),
    padding: 20,
    marginBottom: 40
  },
  cardTitle: {
    fontSize: RFValue(18),
    fontFamily: 'Poppins-Bold',
    paddingLeft: 20,
    color: h.colors.primary,
    maxWidth: '50%'
  },
  titleHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  bigNumber: {
    color: '#fff',
    backgroundColor: h.colors.primary,
    height: RFValue(56),
    width: RFValue(56),
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: RFValue(24),
    fontFamily: 'Poppins-Bold',
    borderRadius: 999,
    paddingTop:'3.5%'
  },
  bigNumberNote: {
    position: 'absolute',
    zIndex: -1,
    backgroundColor: h.colors.accent,
    color: '#fff',
    paddingLeft: 30,
    fontFamily: 'Poppins-Medium',
    borderRadius: 999,
    height: RFValue(28),
    fontSize: RFValue(13),
    paddingRight: 16,
    textAlignVertical: 'center',
    top: RFValue(14),
    left: RFValue(36),
    paddingTop:'1.5%',
    paddingLeft:'10%'
  },
  smallNumber: {
    position: 'absolute',
    top: -10,
    left: -10,
    height: RFValue(48),
    width: RFValue(48),
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: RFValue(18),
    backgroundColor: h.colors.primary,
    color: '#fff',
    borderRadius: 999,
    paddingTop:'25%'
  },
  button: {
    backgroundColor: h.colors.primary,
    alignSelf: 'center',
    borderRadius: 15,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: RFValue(1),
      height: RFValue(5),
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(3.84),
    elevation: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: RFValue(14)
  }
});
