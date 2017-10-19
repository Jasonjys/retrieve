import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {firebaseApp, usersRef, itemsRef} from '../../firebaseConfig';
import ProfileHeader from './ProfileHeader';
import ProfileConTent from './ProfileContent';
import { Modal} from 'antd-mobile';
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
    counterItem1: 0,
    counterItem2: 0
  }

  componentWillMount() {
    let userFoundPostsIds = [];
    const user = firebaseApp.auth().currentUser;
    this.setState({userInfo: user.providerData[0]})
    const uid = user.uid;
    httpRequest("user/found", { uid }, (foundPosts) => {
      this.setState({foundPosts})
    })
    /*usersRef.on('value', (users) => {
      if (users) {
        const userRef = users.val()[user.uid];
        if (userRef) {
          if (userRef.foundPosts) {
            userFoundPostsIds = userRef.foundPosts
            itemsRef.on('value', (items) => {
              let foundPosts = [];
              if (userFoundPostsIds.length) {
                userFoundPostsIds.map((id) => {
                  if (items) {
                    const itemsRef = items.val()
                    if (itemsRef && itemsRef[id]) {
                      const post = {...itemsRef[id], id: id};
                      foundPosts.push(post)
                    }
                  }
                })
                this.setState({foundPosts})
              }
            })
          }
        }
      }
    })*/

    this.props.navigation.setParams({
      handleSignout: this.handleSignout
    })
  }

  componentWillUnmount() {
    usersRef.off();
    itemsRef.off();
  }

  handleDeletePost = (id, index) => {
    const alert = Modal.alert;
    alert('Delete Post', 'Are you sure you want to delete this post?', [
      { text: 'Cancel'},
      { text: 'Yes', onPress: () => {
        itemsRef.child(id).remove();
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
      { text: 'Cancel'},
      { text: 'Yes', onPress: () => {
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
          onDelete={this.handleDeletePost}
          onEdit={this.handleEditPost}
        />
      </View>
    );
  }
}

export default ProfileScreen;