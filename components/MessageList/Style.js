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
  contentContainerStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center'
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
  messageContainerStyle: {
    width: '75%',
  },
  messageTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2
  },
  textUserNameStyle: {
    fontWeight: '900',
    fontSize: 18,
    marginLeft: 10,
    paddingBottom: 2
  },
  textDateStyle: {
    marginLeft: 10,
    marginTop: 4
  },
  textMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 12
  },
  deleteButtonContainerStyle: {
    backgroundColor: '#ffc1cc'
  }
})