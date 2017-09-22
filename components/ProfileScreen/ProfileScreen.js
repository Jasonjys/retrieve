import React, {Component} from 'react';
import {View, Button, Text, Image} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {firebaseApp} from '../../firebaseConfig';

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'User Profile',
    tabBarLabel: 'Profile',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('./account_circle.png')}
        style={{tintColor: tintColor}}
      />
    )
  };

  handleSignout = () => {
    firebaseApp.auth().signOut().then(() => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Login'})]
      });
      this.props.navigation.dispatch(resetAction);
    })

  }

  render() {
    return (
      <View>
        <Text>Profile Screen</Text>
        <Button onPress={this.handleSignout} title="Logout"/>
      </View>
    );
  }
}

export default ProfileScreen;