import React, {Component} from 'react';
import {View, Button, Text, Image} from 'react-native';
import {firebaseApp} from '../../firebaseConfig';

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Lost Posts',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('./account_circle.png')}
        style={{tintColor: tintColor}}
      />
    )
  };

  render() {
    return (
      <View>
        <Text>Profile Screen</Text>
        <Button onPress={() => firebaseApp.auth().signOut()} title="Logout"/>
      </View>
    );
  }
}

export default ProfileScreen;