import React, {Component} from 'react';
import {View, Button as ButtonText} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StackNavigator, NavigationActions} from 'react-navigation';
import {firebaseApp} from '../../firebaseConfig';
import style from './LoginStyle';

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };
  state = {
    email: '',
    password: '',
    errorMessage: '',
  }

  handleLogin = () => {
    const {email, password} = this.state;
    const {navigation} = this.props;
    if (!email || !password) {
      return;
    }
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .then((payload) => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Home'})]
      });
      navigation.dispatch(resetAction);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorMessage = 'Wrong email or password'
      this.setState({errorMessage})
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    const {errorMessage} = this.state;
    return (
      <KeyboardAwareScrollView style={style.loginContainer}>
        <FormLabel>Email</FormLabel>
        <FormInput
          value={this.state.email}
          onChangeText={email => this.setState({email})}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({password})}
        />
        <FormValidationMessage>{errorMessage}</FormValidationMessage>
        <View style={style.buttonContainer}>
          <Button
            raised
            backgroundColor={'blue'}
            title='Login'
            onPress={this.handleLogin}
          />
          <ButtonText
            onPress={() => navigate('Signup')}
            title="Not yet a user? Sign up here!"
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Login;