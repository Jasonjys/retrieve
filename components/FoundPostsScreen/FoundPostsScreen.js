import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {ActivityIndicator} from 'antd-mobile';
import List from '../List/List';
import {itemsRef} from '../../firebaseConfig';
import style from './Style'

class FoundPostsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Found Posts',
    headerRight: <Icon
      name='add-circle'
      color='#e91e63'
      size={35}
      containerStyle={style.navigationContainerStyle}
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
    loading: true,
    list: [],
    search_string: '',
    search_location: '',
    search_date: ''
  }

  componentDidMount() {
    itemsRef.on('value', (snapshot) => {
      this.setState({loading: false});
      if (snapshot.val()) {
        this.setState({list: Object.values(snapshot.val())});
      }
    })
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
    const {navigate} = this.props.navigation;
    const loadingOrList = this.state.loading 
      ? <View style={style.fetchStyle}>
          <ActivityIndicator animating text='Fetching Items'/>
        </View>
      : <List navigate={navigate} list={this.state.list} />
    return (
      <View style={style.containerStyle}>
        <View style={style.searchButtonContainerStyle}>
          <Button
            iconLeft
            icon={{name: 'search', size: 26}}
            title='Search'
            fontWeight={'500'}
            containerViewStyle={style.containerViewStyle}
            buttonStyle={style.buttonStyle}
            onPress={() => this.props.navigation.navigate('TemSearch')}
            borderRadius={50}
          />
        </View>
        <View style={style.listContainerStyle}>
          {loadingOrList}
        </View>
      </View>
    );
  }
}

export default FoundPostsScreen;