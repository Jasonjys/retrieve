import React, { Component } from 'react';
import {ScrollView, TouchableOpacity, View, Text, ActivityIndicator} from 'react-native';
import SwipeList from '../SwipeList/SwipeList';
import style from './Style';
import firebase from '../../library/firebase';
import moment from 'moment';

class ProfileContent extends Component {
  state = {
    loading: true,
    posts: []
  }

  removeListener = () => {
    const {posts, type} = this.props;
    const postsRef = type ? firebase.getFoundPostsRef() : firebase.getLostPostsRef();
    posts.map((postID) => {
      postsRef.child(postsRef).off();
    });
  }

  componentWillReceiveProps(nextProps) {
    const {posts, type} = nextProps;
    if (posts.length === 0) {
      this.setState({
        loading: false
      })
    }
    const postsRef = type ? firebase.getFoundPostsRef() : firebase.getLostPostsRef();
    const postArr = [];
    posts.forEach((postID, index) => {
      postsRef.child(postID).on('value', (singlePost) => {
        singlePost = singlePost.val();
        index = postArr.indexOf(postArr.find((post) => {
          return post.id === postID;
        }));
        if (index !== -1) {
          postArr[index] = {...singlePost, id: postID};
        } else {
          postArr.unshift({...singlePost, id: postID});
        }
        this.setState({
          posts: postArr,
          loading: false
        })
      });
    })
  }

  componentWillUnMount() {
    this.removeListener();
  }

  render() {
    const {navigate} = this.props.navigation;
    const {posts, loading} = this.state;
    if (loading) {
      return (
      <View style={style.loading}>
        <ActivityIndicator animating text='Fetching posts' />
      </View>)
    }
    if (!this.props.posts.length) {
      return (
        <View style={[style.contentContainerStyle, {alignItems: 'center'}]}>
          <Text style={{marginTop: '35%', fontSize: 18, color: '#bababa'}}>
            You don't have any {this.props.displayFound ? 'found' : 'lost'} posts at the moment
          </Text>
        </View>
      )
    }
    return (
      <ScrollView style={style.contentContainerStyle}>
        <SwipeList
          list={posts}
          onDelete={this.props.onDelete}
          onEdit={this.props.onEdit}
          displayFound={this.props.displayFound}
          navigate={navigate}
        />
      </ScrollView>
    );
  }
}

export default ProfileContent;