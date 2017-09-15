import React from 'react';
import { StyleSheet } from 'react-native';


export var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#a8c9ff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 25,
    fontWeight: "500",
    color: 'white'
  },
  statusbar: {
    backgroundColor: '#a8c9ff',
    height: 22,
  }
})