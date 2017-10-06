<<<<<<< HEAD
import React, { Component } from 'react';
import { View, Button, Text, Image, StyleSheet } from 'react-native';
import {NavigationActions} from 'react-navigation';
import { firebaseApp } from '../../firebaseConfig';
import ProfileHeader from './ProfileHeader';
import ProfileBar from './ProfileBar';
import ProfilePosts from './ProfilePosts';
=======
import React, {Component} from 'react';
import {View, Button, Text, Image} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {firebaseApp} from '../../firebaseConfig';
>>>>>>> cc43c63f2f779e976e3ec028e15cf11ece53d4c1

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'User Profile',
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/images/account_circle.png')}
        style={{tintColor: tintColor}}
      />
    )
  };

  state = {
    userInfo: null
  }

  componentDidMount() {
    const user = firebaseApp.auth().currentUser;
<<<<<<< HEAD
    this.setState({userInfo: user.providerData[0]})
=======
    if (user) {
      this.setState({userInfo: user.providerData[0]})
    }
>>>>>>> cc43c63f2f779e976e3ec028e15cf11ece53d4c1
  }

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
    console.log(this.state.userInfo)
    return (
<<<<<<< HEAD
      <View style={styles.container}>
      
        <ProfileHeader stuff={this.state.userInfo}/>
        <ProfileBar />
        <ProfilePosts />
        <Button title='signout' onPress={this.handleSignout}/>
=======
      <View>
        <Text>Profile Screen</Text>
        <Button onPress={this.handleSignout} title="Logout"/>
>>>>>>> cc43c63f2f779e976e3ec028e15cf11ece53d4c1
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default ProfileScreen;