import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {ActivityIndicator} from 'antd-mobile';
import List from '../List/List';
import {foundPostRef} from '../../firebaseConfig';
import httpRequest from '../../library/httpRequest';

class FoundPostsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Found Posts',
    headerRight: <Icon
      name='add-circle'
      color='#e91e63'
      size={35}
      containerStyle={{paddingRight: 12}}
      onPress={() => navigation.navigate('CreatePost', {
        lostOrFound: 2
      })}
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
    keyword: '',
    location: '',
    date: '',
    category: ''
  }

  componentDidMount() {
    this.refreshPostlist();
  }

  refreshPostlist = () => {
    this.setState({
      loading: true,
      list: []
    });
    const {date, location, keyword, category} = this.state
    httpRequest(2, {date, location, keyword, category}, (post) => {
      console.log(post);
      this.setState({
        loading: false,
        list: post
      });
    })
  }

  searchUpdatedCallback = (newState) => {
    const {
      keyword,
      location,
      date
    } = newState;
    this.setState({
      keyword,
      location,
      date
    }, () => {
      this.refreshPostlist();
    });
  }

  _onSearchPress = () => {
    const {navigate} = this.props.navigation;
    const {
      navigation,
      keyword,
      date,
      location,
    } = this.state;
    navigate('Search', {
      keyword,
      date,
      location,
      searchUpdatedCallback: this.searchUpdatedCallback
    })
  };

  render() {
    const {navigate} = this.props.navigation;
    const loadingOrList = this.state.loading 
      ? <View style={{height: '95%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator animating text='Fetching Items'/>
        </View>
      : <List navigate={navigate} list={this.state.list} />
    return (
      <View style={{flex: 1, height: '100%'}}>
        <View style={{flex:1, height: '5%', backgroundColor: 'white'}}>
          <Button
            iconLeft
            icon={{name: 'search', size: 26}}
            title='Search'
            fontWeight={'500'}
            containerViewStyle={{width: '100%', marginLeft: 0}}
            buttonStyle={{height: 30, backgroundColor: '#dbdde0'}}
            onPress={() => this.props.navigation.navigate('TemSearch')}
            borderRadius={50}
          />
        </View>
        <View style={{height: '95%', width: '100%'}}>
          {loadingOrList}
        </View>
      </View>
    );
  }
}

export default FoundPostsScreen;