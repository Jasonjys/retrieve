import React, {Component} from 'react';
import {View, Button as ButtonText} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StackNavigator, NavigationActions} from 'react-navigation';
import {firebaseApp} from '../../firebaseConfig';
import firebase from 'firebase';
import {usersRef} from '../../firebaseConfig';
import style from './LoginStyle';

const FB_APP_ID = '1376485632449872';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login to Retrieve',
  };

  state = {
    email: '',
    password: '',
    errorMessage: '',
  }

  componentDidMount() {
    const {navigation} = this.props;
    //console.log(firebaseApp.);
    this.removeAuthListener = firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Tabs'})]
        });
        navigation.dispatch(resetAction);
      }
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  handleLogin = () => {
    const {email, password} = this.state;
    const {navigation} = this.props;
    if (!email || !password) {
      return;
    }
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Tabs'})]
      });
      navigation.dispatch(resetAction);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorMessage = 'Wrong email or password'
      this.setState({errorMessage})
    });
  }


  handleFacebookLogin = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
      permissions: ['email', 'public_profile'],
    });
    if (type === 'success') {
      try {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        // Sign in with credential from the Facebook user.
        firebaseApp.auth().signInWithCredential(credential)
        .then(({uid, email, displayName}) => {
          usersRef.once('value').then((snapshot) => {
            const existUser = snapshot.val()[uid];
            if (!existUser) {
              usersRef.child(`${uid}`).set({
                email,
                displayName
              });
            }
          })
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.init({routeName: 'Tabs'})]
          });
          this.props.navigation.dispatch(resetAction);
        })
        .catch((error) => {
          console.log(error)
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (type !== 'success') {
      alert('Uh oh, something went wrong');
      return;
    }
  }

  render() {
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
          <Button
            title="Login with Facebook"
            onPress={this.handleFacebookLogin} 
          />
          <ButtonText
            onPress={() => this.props.navigation.navigate('Signup')}
            title="Not yet a user? Sign up here!"
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default LoginScreen;