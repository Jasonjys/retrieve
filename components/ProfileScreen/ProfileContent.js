import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import SwipeList from '../SwipeList/SwipeList';
import style from './Style'

class ProfileContent extends Component {
  render() {
    return (
      <ScrollView style={[ style.barContainerStyle, {backgroundColor: 'white'} ]}>
        <SwipeList list={this.props.foundPosts}/>
      </ScrollView>
    );
  }
}

export default ProfileContent;