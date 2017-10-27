import React, {Component} from 'react';
import {View} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationActions} from 'react-navigation';
import {firebaseApp} from '../../firebaseConfig';
import style from './Style';
import {usersRef} from '../../firebaseConfig';

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

    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .then(({uid}) => {
      const user = firebaseApp.auth().currentUser;
      user.updateProfile({
        displayName: name,
      }).then(() => {
        usersRef.child(uid).set({
          email,
          displayName: name
        })
      }).catch((error) => {
        console.log(error);
      })
    })
    .catch((error) => {
      var {code, message} = error;
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
            onChangeText={email => this.setState({email, emailError: ''})}
          />
          {emailError ? <FormValidationMessage>{emailError}</FormValidationMessage> : null}
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            value={this.state.password}
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
