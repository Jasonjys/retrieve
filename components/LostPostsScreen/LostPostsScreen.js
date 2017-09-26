import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

class LostPostsScreen extends Component {
  static navigationOptions = {
    title: 'Lost Posts',
    tabBarLabel: 'Lost Posts',
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
        <Text>LostPostsScreen</Text>
      </View>
    );
  }
}

export default LostPostsScreen;