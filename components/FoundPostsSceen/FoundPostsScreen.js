import React, {Component} from 'react';
import {View, Text, Button, Image} from 'react-native';

class FoundPostsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Found Posts',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('./item.png')}
        style={{tintColor: tintColor}}
      />
    )
  };

  render() {
    return (
      <View>
        <Text>FoundPostsScreen</Text>
      </View>
    );
  }
}

export default FoundPostsScreen;