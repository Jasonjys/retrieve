import React, {Component} from 'react';
import {View, Button, Text, Image, TouchableHighlight} from 'react-native';
import Swipeable from 'react-native-swipeable';
import {firebaseApp} from '../../firebaseConfig';


class SwipeList extends Component {

  render() {
    const rightButtons = [
      <TouchableHighlight><Text>Edit</Text></TouchableHighlight>,
      <TouchableHighlight><Text>Delete</Text></TouchableHighlight>
    ];
    return (
      <View style={{flex: 1, height: '100%', width: '100%'}}>
        {this.props.list.map((item, key) => (
          <Swipeable key={key} style={{backgroundColor: 'red', height: '30%'}} rightButtons={rightButtons}>
            <Text>{item.title}</Text>
          </Swipeable>
        ))}
      </View>
    );
  }
}

export default SwipeList;