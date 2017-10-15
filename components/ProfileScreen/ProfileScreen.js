import React, { Component } from 'react';
import {View, Button, Text, Image} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {firebaseApp} from '../../firebaseConfig';
import ProfileHeader from './ProfileHeader';
import ProfileBar from './ProfileBar';
import style from './Style'

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state
    return {
      title: 'User Profile',
      tabBarLabel: 'Profile',
      headerRight: <Icon
        name='exit-to-app'
        size={35}
        containerStyle={{paddingRight: 12}}
        onPress={() => params.handleSignout()}
      />,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../../assets/images/account_circle.png')}
          style={{tintColor: tintColor}}
        />
      )
    }
  };

  state = {
    userInfo: null,
    counterItem1: 0,
    counterItem2: 0
  }

  componentDidMount() {
    const user = firebaseApp.auth().currentUser;
    this.setState({userInfo: user.providerData[0]})
    this.props.navigation.setParams({
      handleSignout: this.handleSignout
    })
  }

  handleSignout = () => {
    firebaseApp.auth().signOut().then(() => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Login'})]
      });
      this.props.navigation.dispatch(resetAction);
    })
  }

  render() {
    return (
      <View style={style.profileScreenContainer}>
        <ProfileHeader userInfo={this.state.userInfo}/>
        <ProfileBar />
      </View>
    );
  }
}

export default ProfileScreen;