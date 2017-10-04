import React, {Component} from 'react';
import {View, Text, Image, Button, TouchableHighlight} from 'react-native';
import {NavigationActions} from 'react-navigation';
import { Icon } from 'react-native-elements';

class FoundPostsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Found Posts',
    headerRight: <Icon
      name='add-circle'
      color='#e91e63'
      size={35}
      containerStyle={{paddingRight: 12}}
      onPress={() => navigation.navigate('CreateFoundPost')}
    />,
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('./item.png')}
        style={{tintColor: tintColor}}
      />
    )
  });

  state = {
    "loading": false,
    "search_string": "",
    "search_location": "",
    "search_date": ""
  }

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
        <Text>FoundPostsScreen</Text>
        {/* <Text>{params.userInfo}</Text> */}
        <Text>This is the found post page</Text>
        <TouchableHighlight onPress={this._onSearchPress.bind(this)}>
          <Text>Search</Text>
        </TouchableHighlight>
        <Text>Search String: {this.state.search_string}</Text>
        <Text>Search location:{this.state.search_location}</Text>
        <Text>Search date: {this.state.search_date}</Text>
        <Button onPress={() => this.props.navigation.navigate('Map')} title="Map"/>
      </View>
    );
  }
}

export default FoundPostsScreen;