import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  profileScreenContainer: {
    flex: 1
  },
  profilePicStyle: {
    flex: 1,
    alignItems: 'center',
    width: 140,
    borderRadius: 100,
    borderColor: 'rgba(0,0,0, 0.4)',
    borderWidth: 6
  },
  touchableHeighlightStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140
  },
  profileDefaultStyle: {
    flex: 1,
    width: 140,
    borderRadius: 100,
    borderColor: 'rgba(0,0,0, 0.4)',
    borderWidth: 6
  },
  headerContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  editButtonStyle: {
    marginLeft: 5,
    marginTop: 0
  },
  headerBackgroundStyle: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  textBackgroundStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center'
  },
  headerNameStyle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  emailAndTelStyle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '300',
    fontStyle: 'italic'
  },
  contentContainerStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white'
  },
  tab: {
    backgroundColor: "lightgrey",
    flexDirection: 'row',
    height: '10%',
    width: '100%'
  },
  tabItem: {
    padding: 15,
    height: '100%'
  },
  tabFont: {
    fontStyle: 'italic',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
})