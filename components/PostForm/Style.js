import React from 'react';
import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    height: '100%'
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