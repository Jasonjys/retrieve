import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {firebaseApp, usersRef, itemsRef} from '../../firebaseConfig';
import ProfileHeader from './ProfileHeader';
import ProfileConTent from './ProfileContent';
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
    foundPosts: [],
    counterItem1: 0,
    counterItem2: 0
  }

  componentDidMount() {
    let userFoundPostsIds;
    let foundPosts = [];
    const user = firebaseApp.auth().currentUser;
    const {uid} = user;
    this.setState({userInfo: user.providerData[0]})
    usersRef.on('value', (snapshot) => {
      userFoundPostsIds = snapshot.val()[uid].foundPosts || []
      itemsRef.on('value', (snapshot) => {
        if (userFoundPostsIds.length) {
          userFoundPostsIds.map((id) => {
            const post = snapshot.val()[id];
            if (post) {foundPosts.push(post)}
          })
          this.setState({foundPosts})
        }
      })
    })
    this.props.navigation.setParams({
      handleSignout: this.handleSignout
    })
  }

  handleDeletePost = (item) => {
    console.log("delete:", item)
    //itemsRef.child(ID).remove()
  }

  handleEditPost = (item) => {
    this.props.navigation.navigate('PostForm', {post: item});
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
    console.log(this.state.userInfo)
    return (
      <View style={style.profileScreenContainer}>
        <ProfileHeader userInfo={this.state.userInfo}/>
        <ProfileConTent
          foundPosts={this.state.foundPosts}
          onDelete={this.handleDeletePost}
          onEdit={this.handleEditPost}
        />
      </View>
    );
  }
}

export default ProfileScreen;