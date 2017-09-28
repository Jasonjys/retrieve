import React, {Component} from 'react';
import {View, Text, Image, Button} from 'react-native';
import { Icon } from 'react-native-elements'

class FoundPostsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Found Posts',
    headerRight: <Icon
      name='add-circle'
      color='#e91e63'
      size={35}
      containerStyle={{paddingRight: 12}}
      onPress={() => navigation.navigate('CreateFoundPost')}
    />,
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('./item.png')}
        style={{tintColor: tintColor}}
      />
    )
  });

  render() {
    return (
      <View>
        <Text>FoundPostsScreen</Text>
        <Button onPress={() => this.props.navigation.navigate('Map')} title="Map"/>
        <Button onPress={() => this.props.navigation.navigate('List')} title="List"/>
      </View>
    );
  }
}

export default FoundPostsScreen;