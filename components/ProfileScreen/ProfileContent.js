import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import SwipeList from '../SwipeList/SwipeList';
import style from './Style'

class ProfileContent extends Component {
  render() {
    const {navigate} = this.props.navigation
    if (!this.props.posts.length) {
      return (
        <View style={[style.contentContainerStyle, {alignItems: 'center'}]}>
          <Text style={{marginTop: '35%', fontSize: 18, color: '#bababa'}}>
            You don't have any posts at the moment
          </Text>
        </View>
      )
    }
    return (
      <ScrollView style={style.contentContainerStyle}>
        <SwipeList
          list={this.props.posts}
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