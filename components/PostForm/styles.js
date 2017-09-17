import React from 'react';
import { StyleSheet } from 'react-native';


export var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#b26aed',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    fontSize: 30,
    fontWeight: "500",
    color: 'white',
    fontFamily: 'Optima-ExtraBlack'
  },
  statusbar: {
    backgroundColor: '#b26aed',
    height: 22,
  }
})