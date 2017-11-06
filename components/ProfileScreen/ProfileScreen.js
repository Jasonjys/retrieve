import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {firebaseApp, usersRef, foundPostsRef, lostPostsRef} from '../../firebaseConfig';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
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
    userInfo: {},
    foundPosts: [],
    lostPosts: [],
    showFoundItem: true
  }
  componentWillMount() {
    const user = firebaseApp.auth().currentUser;
    const {uid} = user;

    usersRef.on('value', (usersRef) => {
      if (usersRef) {
        const userInfo = usersRef.val()[uid]
        this.setState({userInfo})

        if (userInfo) {
          if (userInfo.foundPosts) {
            userFoundPostsIds = userInfo.foundPosts
            foundPostsRef.on('value', (items) => {
              let foundPosts = [];
              if (userFoundPostsIds.length) {
                userFoundPostsIds.map((id) => {
                  if (items) {
                    const itemsRef = items.val()
                    if (itemsRef && itemsRef[id]) {
                      const post = {...itemsRef[id], id};
                      foundPosts.push(post)
                    }
                  }
                })
                foundPosts.sort((a,b) => {
                  return moment(b.postDate) - moment(a.postDate)
                })
                this.setState({foundPosts})
              }
            })
          }
          if (userInfo.lostPosts) {
            userLostPostIds = userInfo.lostPosts
            lostPostsRef.on('value', (items) => {
              let lostPosts = [];
              if (userLostPostIds.length) {
                userLostPostIds.map((id) => {
                  if (items) {
                    const itemsRef = items.val()
                    if (itemsRef && itemsRef[id]) {
                      const post = {...itemsRef[id], id};
                      lostPosts.push(post)
                    }
                  }
                })
                lostPosts.sort((a,b) => {
                  return moment(b.postDate) - moment(a.postDate)
                })
                this.setState({lostPosts})
              }
            })
          } 
        }
      }
    })

    this.props.navigation.setParams({
      handleSignout: this.handleSignout
    })
  }

  componentWillUnmount() {
    usersRef.off();
    foundPostsRef.off();
    lostPostsRef.off();
  }

  handlePressTab = (showFoundItem) => {
    this.setState({showFoundItem})
  }

  handleDeletePost = (found, id, index) => {
    const alert = Modal.alert;
    alert('Delete Post', 'Are you sure you want to delete this post?', [
      {text: 'Cancel'},
      {text: 'Yes', onPress: () => {
        const postRef = found ? foundPostsRef : lostPostsRef;
        const propertyName = found ? 'foundPosts' : 'lostPosts';
        postRef.child(id).remove();
        const {uid} = firebaseApp.auth().currentUser;
        const oldIds = this.state[propertyName].map((post) => {
          return post.id
        });
        newIds = [
          ...oldIds.slice(0, index),
          ...oldIds.slice(index + 1)
        ]
        const updateObject = {}
        updateObject[propertyName] = newIds;
        usersRef.child(uid).update(updateObject)
      }},
    ])
  }

  handleEditPost = (found, item) => {
    this.props.navigation.navigate('PostForm', {post: item, found});
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
    const {foundPosts, lostPosts, showFoundItem, userInfo} = this.state;
    const Content = foundPosts ?
    <ProfileContent
      navigation={this.props.navigation}
      posts={showFoundItem ? foundPosts : lostPosts}
      displayFound={this.state.showFoundItem}
      onDelete={this.handleDeletePost}
      onEdit={this.handleEditPost}
    /> : null
    return (
      <View style={style.profileScreenContainer}>
        <ProfileHeader userInfo={userInfo} navigation={this.props.navigation}/>
        <ProfileTab found={foundPosts.length} lost={lostPosts.length} onPressTab={this.handlePressTab}/>
        {Content}
      </View>
    );
  }
}

export default ProfileScreen;