import React, {Component} from 'react';
import {View, Text, Image, Button} from 'react-native';
import { Icon } from 'react-native-elements';
import List from '../List/ListComponent'

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
        source={require('../../assets/images/item.png')}
        style={{tintColor: tintColor}}
      />
    )
  });

  state = {
    loading: false,
    search_string: '',
    search_location: '',
    search_date: ''
  }

  searchUpdatedCallback = (newState) => {
    const {search_string, search_location, search_date} = newState;
    this.setState({
      search_string,
      search_location,
      search_date
    })
  }

  _onSearchPress = () => {
    const {navigate} = this.props.navigation;
    const {
      navigation,
      search_string,
      search_date,
      search_location,
    } = this.state;
    navigate('Search', {
      search_string,
      search_date,
      search_location,
      searchUpdatedCallback: this.searchUpdatedCallback
    })
  };

  render() {
    return (
      <View style={{flex: 1, height: '100%'}}>
        <Button title="Map" onPress={() => this.props.navigation.navigate('Map')}/>
        <View style={{height: '95%', width: '100%'}}>
          <List/>
        </View>
      </View>
    );
  }
}

export default FoundPostsScreen;