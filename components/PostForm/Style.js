import React from 'react';
import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  datePicker: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row"
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%'
  },
  buttonStyle: {
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
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#b6b7ba',
    width: '90%',
    height: 35,
    marginLeft: '5%'
  },
})

export const dateStyle = {
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0
  },
  dateInput: {
    marginLeft: 50,
    borderWidth: 0,
    borderBottomWidth: 2
  }
}