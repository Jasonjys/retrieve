import React, {Component} from 'react';
import {View, Button, Text, Image, StyleSheet, TouchableHighlight, ScrollView} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import Swipeable from 'react-native-swipeable';
import {firebaseApp, usersRef, itemsRef} from '../../firebaseConfig';
import SwipeList from '../SwipeList/SwipeList';
import style from './Style'

class ProfileBar extends Component {
  state = {
    foundPosts: []
  };

  componentDidMount() {
    const uid = firebaseApp.auth().currentUser.uid;
    let userFoundPostsIds;
    let foundPosts = [];
    usersRef.on('value', (snapshot) => {
      userFoundPostsIds = snapshot.val()[uid].foundPosts || []
      itemsRef.on('value', (snapshot) => {
        if (userFoundPostsIds.length) {
          userFoundPostsIds.map((id) => {
            const post = snapshot.val()[id];
            if (post) {foundPosts.push(post)}
          })
          this.setState({foundPosts})
        }
      })
    })
  }

  render() {
    return (
      <ScrollView style={[ style.barContainerStyle, {backgroundColor: 'white'} ]}>
        <SwipeList list={this.state.foundPosts}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%'
  }
});

export default ProfileBar;