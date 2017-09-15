import React, {Component} from 'react';
import {View} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text} from 'react-native-elements';
import style from './LoginStyle';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleLogin = () => {
    console.log('login');
    this.setState({email: '', password: ''});
  }

  render() {
    return (
      <View style={style.loginContainer}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>Retrieve</Text>
        </View>
        <FormLabel>Email</FormLabel>
        <FormInput
          value={this.state.email}
          onChangeText={email => {this.setState({email})}}
        />
        {/* <FormValidationMessage>Error message</FormValidationMessage> */}
        <FormLabel>Password</FormLabel>
        <FormInput
          value={this.state.password}
          onChangeText={password => {this.setState({password})}}
        />
        {/* <FormValidationMessage>Error message</FormValidationMessage> */}
        <View style={style.buttonContainer}>
          <Button
            raised
            backgroundColor={'blue'}
            title='Login'
            onPress={this.handleLogin}
          />
        </View>
      </View>
    );
  }
}

export default Login;