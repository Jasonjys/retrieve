import React, {Component} from 'react';
import {View} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationActions} from 'react-navigation';
import style from './Style';
import firebase from '../../library/firebase';

class SignupScreen extends Component {
  static navigationOptions = {
    title: 'Sign up'
  };

  state = {
    email: '',
    password: '',
    name: '',
    emailError: '',
    passwordError: '',
    requiredError: ''
  }

  handleSignup = () => {
    const {email, password, name} = this.state;
    const {navigation} = this.props;

    this.setState({
      emailError: '',
      passwordError: '',
      requiredError: ''
    });

    if(!name) {
      const requiredError = 'This field is required';
      this.setState({requiredError});
    }

    firebase.auth.createUserWithEmailAndPassword(email, password)
    .then(({uid}) => {
      const user = firebase.getCurrentUser();
      user.updateProfile({
        displayName: name,
      }).then(() => {
        firebase.getUsersRef().child(uid).set({
          email,
          displayName: name
        })
      }).catch((error) => {
        console.log(error);
      })
    })
    .catch((error) => {
      const {code, message} = error;
      console.log(message);
      if (code === 'auth/weak-password') {
        this.setState({passwordError: message});
      } else {
        this.setState({emailError: message});
      }
    });
  }

  render() {
    const {emailError, passwordError, requiredError, name} = this.state;
    return (
        <KeyboardAwareScrollView style={style.signupContainer}>
          <FormLabel>Name</FormLabel>
          <FormInput
            value={this.state.name}
            onChangeText={name => this.setState({name, requiredError: ''})}
          />
          {requiredError ? <FormValidationMessage>{requiredError}</FormValidationMessage> : null}
          <FormLabel>Email</FormLabel>
          <FormInput
            value={this.state.email}
            autoCapitalize='none'
            onChangeText={email => this.setState({email, emailError: ''})}
          />
          {emailError ? <FormValidationMessage>{emailError}</FormValidationMessage> : null}
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            value={this.state.password}
            autoCapitalize='none'
            onChangeText={password => {this.setState({password, passwordError: ''})}}
          />
          {passwordError ? <FormValidationMessage>{passwordError}</FormValidationMessage> : null}
          <View style={style.buttonContainer}>
            <Button
              title="Sign up"
              backgroundColor='#aad1ed'
              fontWeight='bold'
              large
              borderRadius={10}
              onPress={this.handleSignup}
            />
          </View>
        </KeyboardAwareScrollView>
    );
  }
}

export default SignupScreen;
