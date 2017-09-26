import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StackNavigator, NavigationActions} from 'react-navigation';
import {firebaseApp} from '../../firebaseConfig';
import style from './SignupStyle';
const userRef = firebaseApp.database().ref().child('users');

class SignupScreen extends Component {
  static navigationOptions = {
    title: 'Sign up'
  };

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    emailError: '',
    passwordError: '',
    requiredError: ''
  }

  handleSignup = () => {
    const {email, password, firstName, lastName} = this.state;
    const {outerNavigation} = this.props.screenProps;

    this.setState({
      emailError: '',
      passwordError: '',
      requiredError: ''
    });

    if(!firstName || !lastName) {
      const requiredError = 'This field is required';
      this.setState({requiredError});
    }

    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .then(({email, displayName, uid}) => {
      userRef.child(`${uid}`).set({
        uid,
        email,
        displayName: `${firstName} ${lastName}`
      });

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Protected'})]
      });
      outerNavigation.dispatch(resetAction);
    })
    .catch((error) => {
      var {code, message} = error;
      if (code === 'auth/weak-password') {
        this.setState({passwordError: message});
      } else {
        this.setState({emailError: message});
      }
    });
  }

  render() {
    const {emailError, passwordError, requiredError, firstName, lastName} = this.state;
    return (
        <KeyboardAwareScrollView style={style.signupContainer}>
          <FormLabel>First Name</FormLabel>
          <FormInput
            value={this.state.firstName}
            onChangeText={firstName => this.setState({firstName})}
          />
          <FormValidationMessage>{requiredError}</FormValidationMessage>
          <FormLabel>Last Name</FormLabel>
          <FormInput
            value={this.state.lastName}
            onChangeText={lastName => this.setState({lastName})}
          />
          <FormValidationMessage>{requiredError}</FormValidationMessage>
          <FormLabel>Email</FormLabel>
          <FormInput
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
          {emailError ? <FormValidationMessage>{emailError}</FormValidationMessage> : null}
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => {this.setState({password})}}
          />
          {passwordError ? <FormValidationMessage>{passwordError}</FormValidationMessage> : null}
          <View style={style.buttonContainer}>
            <Button
              raised
              backgroundColor={'blue'}
              title='Sign up'
              onPress={this.handleSignup}
            />
          </View>
        </KeyboardAwareScrollView>
    );
  }
}

export default SignupScreen;
