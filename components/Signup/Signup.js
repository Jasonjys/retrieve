import React, {Component} from 'react';
import {View} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements';
import style from './SignupStyle';
import { firebaseApp } from '../../firebaseConfig';

class Signup extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    number: ''
  }

  handleSignup = () => {
    const {email, password} = this.state;
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .then((payload) => {
      console.log(payload);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  render() {
    return (
      <View style={style.loginContainer}>
        <FormLabel>First Name</FormLabel>
        <FormInput
          value={this.state.firstName}
          onChangeText={firstName => this.setState({firstName})}
        />
        <FormLabel>Last Name</FormLabel>
        <FormInput
          value={this.state.lastName}
          onChangeText={lastName => this.setState({lastName})}
        />
        <FormLabel>Email</FormLabel>
        <FormInput
          value={this.state.email}
          onChangeText={email => this.setState({email})}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          value={this.state.password}
          onChangeText={password => {this.setState({password})}}
        />
        <View style={style.buttonContainer}>
          <Button
            raised
            backgroundColor={'blue'}
            title='Sign up'
            onPress={this.handleSignup}
          />
        </View>
      </View>
    );
  }
}

export default Signup;
