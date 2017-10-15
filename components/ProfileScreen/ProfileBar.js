import React, {Component} from 'react';
import {View, Button, Text, Image, StyleSheet, TouchableHighlight, ScrollView} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import Swipeable from 'react-native-swipeable';
import {firebaseApp, usersRef, itemsRef} from '../../firebaseConfig';
import SwipeList from '../SwipeList/SwipeList';

class ProfileBar extends Component {
  state = {
    foundPosts: []
  };

  componentDidMount() {
    const uid = firebaseApp.auth().currentUser.uid;
    let userFoundPostsIds;
    let foundPosts = [];
    usersRef.on('value', (snapshot) => {
      userFoundPostsIds = snapshot.val()[uid].foundPosts
      itemsRef.on('value', (snapshot) => {
        userFoundPostsIds.map((id) => {
          const post = snapshot.val()[id];
          if (post) {foundPosts.push(post)}
        })
        this.setState({foundPosts})
      })
    })
  }

  render() {
    return (
      <ScrollView style={[ styles.container, {backgroundColor: 'white'} ]}>
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
  },
  profilebar: {
    height: 60,
    backgroundColor: '#404040',
    flexDirection: 'row',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: '#fff',
    borderBottomColor: '#fff'
  },

  separator: {
    borderRightWidth: 2,
    borderRightColor: '#fff'
  },

  barItem: {
    flex: 1,
    padding: 12,
    alignItems: 'center'
  },

  topItem: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },

  botItem: {
    color: '#fff',
    fontSize: 12
  }
});

export default ProfileBar;

{/* <View style={[styles.barItem, styles.separator]}>
  <Text style={styles.topItem}>{numPost}</Text>
  <Text style={styles.botItem}>Posts</Text>
</View>

<View style={styles.barItem}>
  <Text style={styles.topItem}>{numClaims}</Text>
  <Text style={styles.botItem}>Claims</Text>
</View> */}

// let numPost = 8;
// let numClaims = 2;
