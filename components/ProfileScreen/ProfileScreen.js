import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {firebaseApp, usersRef, foundPostsRef, lostPostsRef} from '../../firebaseConfig';
import ProfileHeader from './ProfileHeader';
import ProfileConTent from './ProfileContent';
import {Modal} from 'antd-mobile';
import style from './Style';
import httpRequest from '../../library/httpRequest';


class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state
    return {
      title: 'User Profile',
      tabBarLabel: 'Profile',
      headerRight: <Icon
        name='exit-to-app'
        size={35}
        containerStyle={{marginRight: 12}}
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
    foundPosts: [],
    lostPosts: [],
    counterItem1: 0,
    counterItem2: 0
  }

  componentWillMount() {
    let userFoundPostsIds = [];
    const user = firebaseApp.auth().currentUser;
    this.setState({userInfo: user.providerData[0]})
    const uid = user.uid;

    usersRef.child(uid).child('foundPosts').on('value', (foundPostsIds) => {
      foundPostsRef.on('value', (foundPostsRef) => {
        let foundPosts = [];
        if (foundPostsIds.val()) {
          foundPostsIds.val().map((id) => {
            if (foundPostsRef.val()[id]) {
              const foundPost = {...foundPostsRef.val()[id], id: id}
              foundPosts.unshift(foundPost)
            }
          })
          this.setState({foundPosts})
        }
      })
    })

    usersRef.child(uid).child('lostPosts').on('value', (lostPostsIds) => {
      lostPostsRef.on('value', (lostPostsRef) => {
        let lostPosts = [];
        if (lostPostsIds.val()) {
          lostPostsIds.val().map((id) => {
            if (lostPostsRef.val()[id]) {
              const foundPost = {...lostPostsRef.val()[id], id: id}
              lostPosts.unshift(lostPosts)
            }
          })
          this.setState({lostPosts})
        }
      })
    })

    this.props.navigation.setParams({
      handleSignout: this.handleSignout
    })
  }

  componentWillUnmount() {
    usersRef.off();
    foundPostsRef.off();
  }

  handleDeletePost = (id, index) => {
    const alert = Modal.alert;

    alert('Delete Post', 'Are you sure you want to delete this post?', [
      { text: 'Cancel'},
      { text: 'Yes', onPress: () => {
        foundPostsRef.child(id).remove();
        const {uid} = firebaseApp.auth().currentUser;
        let newFoundPostsIds = []
        usersRef.child(uid).once('value').then((user) => {
          const foundPosts = user.val().foundPosts;
          newFoundPostsIds = [
            ...foundPosts.slice(0, index),
            ...foundPosts.slice(index + 1)
          ]
          usersRef.child(uid).update({
            foundPosts: newFoundPostsIds
          })
        });
      } },
    ])
  }

  handleEditPost = (item) => {
    this.props.navigation.navigate('PostForm', {post: item});
  }

  handleSignout = () => {
    const alert = Modal.alert;
    alert('Signing out', 'Are you sure you want to sign out?', [
      {text: 'Cancel'},
      {text: 'Yes', onPress: () => {
        firebaseApp.auth().signOut().then(() => {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.init({routeName: 'Login'})]
          });
          this.props.navigation.dispatch(resetAction);
        })
      } },
    ])
  }

  render() {
    return (
      <View style={style.profileScreenContainer}>
        <ProfileHeader userInfo={this.state.userInfo} navigation={this.props.navigation}/>
        <ProfileConTent
          navigation={this.props.navigation}
          foundPosts={this.state.foundPosts}
          lostPosts={this.state.lostPosts}
          onDelete={this.handleDeletePost}
          onEdit={this.handleEditPost}
        />
      </View>
    );
  }
}

export default ProfileScreen;