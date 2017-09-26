import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation'
import { View, Text, Button, Image, TouchableHighlight } from 'react-native';

class FoundPostsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        "loading": false,
        "search_string": "",
        "search_location": "",
        "search_date": ""
    }
    this.searchUpdatedCallback = this.searchUpdatedCallback.bind(this);
}

  static navigationOptions = {
    title: 'Found',
    tabBarLabel: 'Found Posts',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('./item.png')}
        style={{tintColor: tintColor}}
      />
    )
  };

  searchUpdatedCallback = (new_state, callback) => {
    this.setState({
      search_string: new_state.search_string,
      search_location: new_state.search_location,
      search_date: new_state.search_date
    }, () => {
      callback();
    })
  }

  _onSearchPress() {
    const { navigation } = this.props;
    const navigateAction = NavigationActions.navigate({
      routeName: 'Search',
      params: {
        key: this.props.navigation.state.key,
        search_string: this.state.search_string,
        search_date: this.state.search_date,
        search_location: this.state.search_location,
        searchUpdatedCallback: this.searchUpdatedCallback
      },
      actions: NavigationActions.navigate({routeName: 'Search'})
    });
    navigation.dispatch(navigateAction);
  };


  render() {
    return (
      <View>
        <Text>This is the found post page</Text>
        <TouchableHighlight onPress={this._onSearchPress.bind(this)}>
          <Text>Search</Text>
        </TouchableHighlight>
        <Text>Search String: {this.state.search_string}</Text>
        <Text>Search location:{this.state.search_location}</Text>
        <Text>Search date: {this.state.search_date}</Text>
      </View>
    );
  }
}

export default FoundPostsScreen;