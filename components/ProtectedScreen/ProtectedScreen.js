import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {TabNavigator} from 'react-navigation';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import FoundPostsScreen from '../FoundPostsSceen/FoundPostsScreen';
import LostPostsScreen from '../LostPostsScreen/LostPostsScreen';

export default TabNavigator({
  Profile: {
    screen: ProfileScreen
  },
  FoundPosts: {
    screen: FoundPostsScreen
  },
  LostPosts: {
    screen: LostPostsScreen
  }
}, {
  initialRouteName: 'FoundPosts',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63'
  }
});