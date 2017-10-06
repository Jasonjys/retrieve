import React, { Component } from 'react';
import { View, Button, Text, Image, StyleSheet } from 'react-native';
import {NavigationActions} from 'react-navigation';
import { firebaseApp } from '../../firebaseConfig';
import ProfileHeader from './ProfileHeader';
import ProfileBar from './ProfileBar';
import ProfilePosts from './ProfilePosts';

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
    this.setState({userInfo: user.providerData[0]})
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
      <View style={styles.container}>
      
        <ProfileHeader stuff={this.state.userInfo}/>
        <ProfileBar />
        <ProfilePosts />
        <Button title='signout' onPress={this.handleSignout}/>
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