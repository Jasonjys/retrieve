import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import SwipeList from '../SwipeList/SwipeList';
import style from './Style'

class ProfileContent extends Component {

  state = {
    items: this.props.foundPosts
  }

  foundTabPress = () => {
    this.setState({items: this.props.foundPosts})
  }

  lostTabPress = () => {
    this.setState({items: this.props.lostPosts})
  }

  componentWillMount () {
    this.setState({items: this.props.foundPosts})
  }

  render() {
    console.log(this.state.items)
    const { navigate } = this.props.navigation
    return (
      <ScrollView style={[style.contentContainerStyle, { backgroundColor: 'white' }]}>

      <View style={style.tab}>
        <TouchableOpacity onPress={this.foundTabPress}>
          <View style={[style.tabItem, style.saperator]}>
            <Text style={style.tabFont}>Found</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.lostTabPress}> 
          <View style={[style.tabItem]}>
            <Text style={style.tabFont}>Lost</Text>
          </View>
        </TouchableOpacity>
      </View>

        <SwipeList
          list={this.state.items}
          onDelete={this.props.onDelete}
          onEdit={this.props.onEdit}
          navigate={navigate}
        />
      </ScrollView>
    );
  }
}

export default ProfileContent;