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
    height: '100%',
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
  textUserNameStyle: {
    fontWeight: '900',
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
    flexWrap: 'wrap'
  },
  textMessageStyle: {
    marginTop: 5,
    marginLeft: 10
  },
  deleteButtonContainerStyle: {
    backgroundColor: '#ffc1cc'
  }
})