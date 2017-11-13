import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Icon} from 'react-native-elements';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import ProfileTab from './ProfileTab'
import {Modal} from 'antd-mobile';
import style from './Style';
import httpRequest from '../../library/httpRequest';
import firebase from '../../library/firebase';


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
  componentDidMount() {
    const user = firebase.getCurrentUser();
    const {uid} = user;

    firebase.usersRef.child(uid).on('value', (userSnapShot) => {
      const userInfo = userSnapShot.val();
      if (userInfo) {
        const {photoURL, displayName, email, phoneNumber} = userInfo;
        this.setState({
          userInfo: {uid, phoneNumber, photoURL, displayName, email},
          lostPosts: userInfo.lostPosts ? userInfo.lostPosts : [],
          foundPosts: userInfo.foundPosts ? userInfo.foundPosts : []
        });
      }
    })

    this.props.navigation.setParams({
      handleSignout: this.handleSignout
    })
  }

  componentWillUnmount() {
    const {uid} = this.state.userInfo;
    firebase.usersRef.child(uid).off();
  }

  handlePressTab = (showFoundItem) => {
    this.setState({showFoundItem})
  }

  handleDeletePost = (found, id, index) => {
    const alert = Modal.alert;
    alert('Delete Post', 'Are you sure you want to delete this post?', [
      {text: 'Cancel'},
      {text: 'Yes', onPress: () => {
        const postRef = found ? firebase.foundPostsRef : firebase.lostPostsRef;
        const propertyName = found ? 'foundPosts' : 'lostPosts';
        postRef.child(id).remove();
        const {uid} = firebase.getCurrentUser();
        const oldIds = this.state[propertyName];
        const index = oldIds.indexOf(id)
        newIds = [
          ...oldIds.slice(0, index),
          ...oldIds.slice(index + 1)
        ]
        const updateObject = {}
        updateObject[propertyName] = newIds;
        firebase.usersRef.child(uid).update(updateObject)
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
        firebase.signOut().then(() => {
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
      type={showFoundItem}
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