import React from 'react';
import { StyleSheet } from 'react-native';


export var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  submitButton: {
    backgroundColor: '#b26aed',
    margin: 10,
    shadowColor: '#000000',
    borderRadius:10,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3
  }
})