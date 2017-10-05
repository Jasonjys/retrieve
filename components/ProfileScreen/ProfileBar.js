import React, {Component} from 'react';
import {View, Button, Text, Image, StyleSheet, TouchableHighlight} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import Swipeable from 'react-native-swipeable';
import {firebaseApp, usersRef, itemsRef} from '../../firebaseConfig';

const rightButtons = [
  <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
  <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
];

const FirstRoute = () => {
  return (
    <View
      style={[ styles.container, {backgroundColor: 'white'} ]} 
    >
      <Swipeable style={{backgroundColor: 'red', height: '20%'}} rightButtons={rightButtons}>
        <Text>My swipeable content</Text>
      </Swipeable>
    </View>
  )
}

const SecondRoute = () => <View style={[ styles.container, {backgroundColor: 'white'} ]} />;
let numPost = 8;
let numClaims = 2;

class ProfileBar extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Posts' },
      { key: '2', title: 'Claims' },
    ],
    list: []
  };

  componentDidMount() {
    const uid = firebaseApp.auth().currentUser.uid;
    console.log(uid)
    let userFoundPostsIds, foundPostsArray;
    usersRef.on('value', (snapshot) => {
      userFoundPostsIds = snapshot.val()[uid].foundPosts
      console.log(userFoundPostsIds)
    })

    // itemsRef.on('value', (snapshot) => {
      
    // })
  }

  handleIndexChange = index => this.setState({index});
  
  renderHeader = props => <TabBar style={{backgroundColor: '#404040'}}{...props} />;

  renderScene = SceneMap({
    '1': FirstRoute,
    '2': SecondRoute,
  });

  render() {
    return (
      <TabViewAnimated
        swipeEnabled={false}
        style={styles.container}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onIndexChange={this.handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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