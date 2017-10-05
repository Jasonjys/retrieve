import React, {Component} from 'react';
import {View, Button, Text, Image, StyleSheet} from 'react-native';
import {firebaseApp} from '../../firebaseConfig';

let numPost = 8;
let numClaims = 2;

class ProfileBar extends Component {
  render() {
    return (
      <View style={styles.profilebar}>

        <View style={[styles.barItem, styles.separator]}>
          <Text style={styles.topItem}>{numPost}</Text>
          <Text style={styles.botItem}>Posts</Text>
        </View>

        <View style={styles.barItem}>
          <Text style={styles.topItem}>{numClaims}</Text>
          <Text style={styles.botItem}>Claims</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
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