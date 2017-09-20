import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import LoginScreen from './components/LoginScreen/LoginScreen';
import SignupScreen from './components/SignupScreen/SignupScreen';
import ProtectedScreen from './components/ProtectedScreen/ProtectedScreen';
import {firebaseApp} from './firebaseConfig';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Retrieve',
  };

  state = {
    isLogined: false,
    loading: true
  }

  componentDidMount() {
    this.removeAuthListener = firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLogined: true,
          loading: false
        })
      } else {
        this.setState({
          isLogined: false,
          loading: false
        })
      }
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    const {navigation} = this.props;
    const {isLogined, loading} = this.state;
    const {navigate} = navigation;

    if (loading) {
      return <Text>Loading</Text>
    }

    if (isLogined) {
      return (
        <ProtectedScreen />
      )
    } else {
      return (
        <LoginScreen navigate={navigate} />
      );
    }
  }
}

export default StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen}
});
