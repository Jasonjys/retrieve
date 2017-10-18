import React, {Component} from 'react';
import {View, Button as ButtonText} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Text} from 'react-native-elements';
import {ActivityIndicator} from 'antd-mobile';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationActions} from 'react-navigation';
import {firebaseApp} from '../../firebaseConfig';
import firebase from 'firebase';
import {usersRef} from '../../firebaseConfig';
import style from './Style';

const FB_APP_ID = '1376485632449872';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  state = {
    loading: true,
    email: '',
    password: '',
    errorMessage: '',
  }

  componentWillMount() {
    const {navigation} = this.props;
    this.removeAuthListener = firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef.child(user.uid).once('value', userRef => {
          if (userRef) {
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [NavigationActions.init({routeName: 'Tabs'})]
            });
            navigation.dispatch(resetAction);
          }
        })
      } else {
        this.setState({loading: false});
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
    this.setState({loading: true});
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      // Handle Errors here.
      this.setState({loading: false});
      const errorMessage = 'Wrong email or password';
      console.log(errorMessage);
      this.setState({errorMessage});
    });
  }

  handleFacebookLogin = async () => {
    this.setState({loading: true});
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
      permissions: ['email', 'public_profile'],
    });
    if (type === 'success') {
      try {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        // Sign in with credential from the Facebook user.
        firebaseApp.auth().signInWithCredential(credential)
        .then(({uid, email, displayName}) => {
          usersRef.once('value').then((users) => {
            const existUser = users.val()[uid];
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
      this.setState({loading: false});
      alert('Uh oh, something went wrong');
      return;
    }
  }

  render() {
    const {errorMessage, loading} = this.state;

    if (loading) {
      return (
        <View style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator animating text='Loading'/>
        </View>
      );
    }
    return (
      <KeyboardAwareScrollView style={style.loginContainer}>
        <Text
        style={{
          fontSize: 70,
          marginVertical: '8%',
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#7b96c6',
          fontFamily: 'Avenir Next'}}>
        Retrieve</Text>
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
            backgroundColor='#ffc1cc'
            title='Login'
            buttonStyle={{marginBottom: 10}}
            fontWeight='bold'
            large
            borderRadius={10}
            onPress={this.handleLogin}
          />
          <Button
            title="Login with Facebook"
            backgroundColor='#aad1ed'
            fontWeight='bold'
            large
            borderRadius={10}
            onPress={this.handleFacebookLogin} 
          />
          <ButtonText
            color='#92b5ce'
            onPress={() => this.props.navigation.navigate('Signup')}
            title="Not yet a user? Sign up here!"
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default LoginScreen;