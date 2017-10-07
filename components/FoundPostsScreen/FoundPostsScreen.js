import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import List from '../List/List';
import {itemsRef} from '../../firebaseConfig';

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
    list: [],
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
    const {navigate} = this.props.navigation;
    itemsRef.on('value', (snapshot) => {
      // console.log(Object.values(snapshot.val()))
    })
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
          <List navigate={navigate}/>
        </View>
      </View>
    );
  }
}
// list={this.state.list}
export default FoundPostsScreen;