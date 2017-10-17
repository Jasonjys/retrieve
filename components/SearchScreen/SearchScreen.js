import React, {Component} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import style from './Style'

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    const {keyword, location, date, searchUpdatedCallback} = params;
    this.state = {
      keyword,
      location,
      date
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
          onChangeText={(keyword) => this.setState({keyword})}
          value={this.state.search_string}
        />
        <TextInput
          placeholder={"Search Location"}
          onChangeText={(location) => this.setState({location})}
          value={this.state.search_location}
        />
        <TextInput
          placeholder={"Search Date"}
          onChangeText={(date) => this.setState({date})}
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