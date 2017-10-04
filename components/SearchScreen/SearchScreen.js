import React, {Component} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import style from './SearchStyle'

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    const {search_string, search_location, search_date, searchUpdatedCallback} = params;
    this.state = {
      search_string,
      search_location,
      search_date
    }
    this.searchUpdatedCallback = searchUpdatedCallback;
  }

  static navigationOptions = {
    title: 'Search',
    tabBarVisible: false
  };

  _onSearchPress = () => {
    const {navigation} = this.props;
    this.searchUpdatedCallback(this.state);
    navigation.goBack();
  }

  render() {
    return (
      <View style={style.searchContainer}>
        <Text>This is the search screen</Text>
        <TextInput
          placeholder={"Search String"}
          onChangeText={(search_string) => this.setState({search_string})}
          value={this.state.search_string}
        />
        <TextInput
          placeholder={"Search Location"}
          onChangeText={(search_location) => this.setState({search_location})}
          value={this.state.search_location}
        />
        <TextInput
          placeholder={"Search Date"}
          onChangeText={(search_date) => this.setState({search_date})}
          value={this.state.search_date}
        />
        <Button
          title='Search'
          onPress={this._onSearchPress}
        />
      </View>
    )
  }
};

export default SearchScreen;