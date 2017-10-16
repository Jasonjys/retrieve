import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import SwipeList from '../SwipeList/SwipeList';
import style from './Style'

class ProfileContent extends Component {
  render() {
    const {navigate} = this.props.navigation
    return (
      <ScrollView style={[ style.contentContainerStyle, {backgroundColor: 'white'} ]}>
        <SwipeList
          list={this.props.foundPosts}
          onDelete={this.props.onDelete}
          onEdit={this.props.onEdit}
          navigate={navigate}
        />
      </ScrollView>
    );
  }
}

export default ProfileContent;