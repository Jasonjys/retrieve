import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {firebaseApp, usersRef, foundPostsRef, lostPostsRef} from '../../firebaseConfig';
import ProfileHeader from './ProfileHeader';
import ProfileConTent from './ProfileContent';
import ProfileTab from './ProfileTab'
import {Modal} from 'antd-mobile';
import style from './Style';
import httpRequest from '../../library/httpRequest';
import moment from 'moment'


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
    showFoundItem: true
  }
  componentWillMount() {
    let userFoundPostsIds = [];
    const user = firebaseApp.auth().currentUser;
    const {uid} = user;

    usersRef.child(uid).on('value', (user) => {
      const userInfo = user.val()
      this.setState({userInfo})
    })

    usersRef.child(uid).child('foundPosts').on('value', (foundPostsIds) => {
      foundPostsRef.on('value', (foundPostsRef) => {
        let foundPosts = [];
        if (foundPostsIds.val()) {
          foundPostsIds.val().map((id) => {
            if (foundPostsRef.val()[id]) {
              const foundPost = {...foundPostsRef.val()[id], id: id}
              foundPosts.push(foundPost)
            }
          })
          foundPosts.sort((a,b) => {
            return moment(b.postDate) - moment(a.postDate)
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
              const lostPost = {...lostPostsRef.val()[id], id: id}
              lostPosts.push(lostPost)
            }
          })
          lostPosts.sort((a,b) => {
            return moment(b.postDate) - moment(a.postDate)
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
    const {uid} = firebaseApp.auth().currentUser;
    usersRef.off();
    usersRef.child(uid).child('lostPosts').off();
    usersRef.child(uid).child('foundPosts').off();
    foundPostsRef.off();
    lostPostsRef.off();
  }

  handlePressTab = (showFoundItem) => {
    this.setState({showFoundItem})
  }

  handleDeletePost = (id, index) => {
    const alert = Modal.alert;
    alert('Delete Post', 'Are you sure you want to delete this post?', [
      {text: 'Cancel'},
      {text: 'Yes', onPress: () => {
        foundPostsRef.child(id).remove();
        const {uid} = firebaseApp.auth().currentUser;
        let newFoundPostsIds = []
        const foundPostsIds = this.state.foundPosts.map((post) => {
          return post.id
        });

        newFoundPostsIds = [
          ...foundPostsIds.slice(0, index),
          ...foundPostsIds.slice(index + 1)
        ]
        usersRef.child(uid).update({
          foundPosts: newFoundPostsIds
        })
      }},
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
      }},
    ])
  }

  render() {
    const Content = this.state.foundPosts.length ?
    <ProfileConTent
      navigation={this.props.navigation}
      posts={this.state.showFoundItem ? this.state.foundPosts : this.state.lostPosts}
      onDelete={this.handleDeletePost}
      onEdit={this.handleEditPost}
    /> : null
    return (
      <View style={style.profileScreenContainer}>
        <ProfileHeader userInfo={this.state.userInfo} navigation={this.props.navigation}/>
        <ProfileTab onPressTab={this.handlePressTab}/>
        {Content}
      </View>
    );
  }
}

export default ProfileScreen;