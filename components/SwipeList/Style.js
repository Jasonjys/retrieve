import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  editButtonContainerStyle: {
    backgroundColor: '#c4e6ff'
  },
  buttonContainerViewStyle: {
    width: 50,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '3%'
  },
  deleteButtonContainerStyle: {
    backgroundColor: '#ffc1cc'
  },
  listItemStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 90
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius:25
  },
  textContainerStyle: {
    width: '70%',
    flexWrap: 'wrap',
    paddingBottom: '4%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontWeight: '900',
    fontSize: 18,
    margin: 10,
    textAlign: 'center',
    flexWrap: 'wrap'
  },
  borderStyle: {
    width: '100%',
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 0.3
  }
})