import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import LoginScreen from './components/Login/Login';
import SignupScreen from './components/Signup/Signup';
import {firebaseApp} from './firebaseConfig';
import DetailPage from './components/DetailPage/DetailPage'
import PostForm from './components/PostForm/PostForm'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome to Retrieve',
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
    const {navigate, routes} = navigation;

    if (loading) {
      return <Text>Loading</Text>
    }

    if (isLogined) {
      return (
        <View>
          <Text>Login successfull</Text>
          <Button 
            onPress={() => firebaseApp.auth().signOut()}
            title="Logout"
          />
        </View>
      )
    } else {
      return (
        // <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 10}}>
        //   <Button
        //     onPress={() => navigate('Login')}
        //     title="Login here to post"
        //   />
        // </View>
        <DetailPage />
      );
    }
  }
}

export default StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen}
});
