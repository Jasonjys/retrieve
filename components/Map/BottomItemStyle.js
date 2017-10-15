import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    touchableHightLightStyle: {
        flex: 1,
        backgroundColor: 'white',
        height: '40%',
        alignItems: 'center',
        paddingHorizontal: 10
      },
      containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
      },
      imageStyle: {
        width: '70%',
        flexWrap: 'wrap',
        paddingBottom: '4%'
      },
      textStyle: {
        fontWeight: '900',
        fontSize: 18,
        marginTop: '5%',
        textAlign: 'center',
        flexWrap: 'wrap'
      }
})