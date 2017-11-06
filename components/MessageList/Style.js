import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  buttonContainerViewStyle: {
    width: 50,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '3%'
  },
  loading: {
    height: '95%',
    width: '100%',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  listContainer: {
    height: 300,
    flex: 1
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
    paddingBottom: '4%'
  },
  textStyle: {
    fontWeight: '900',
    fontSize: 18,
    margin: 10,
    textAlign: 'center',
    flexWrap: 'wrap'
  },
  deleteButtonContainerStyle: {
    backgroundColor: '#ffc1cc'
  }
})