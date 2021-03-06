import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {ActivityIndicator} from 'antd-mobile';
import List from '../List/List';
import style from './Style';
import PTRView from 'react-native-pull-to-refresh';
import Cardgrid from '../CardGrid/CardGrid';
import firebase from '../../library/firebase';

class FoundPostsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Recent Found',
    headerRight: <Icon
      name='add-circle'
      color='#e91e63'
      size={35}
      containerStyle={{marginRight: 12}}
      onPress={() => navigation.navigate('PostForm', {
        type: "found"
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
    type: 'found',
    loading: true,
    list: []
  }

  componentDidMount() {
    this.refreshPostlist();
    const user = firebase.getCurrentUser();
    const {uid} = user;
    this.setState({uid});
    firebase.getUsersRef().child(uid).child('foundPosts').on('value', () => {
      this.refreshPostlist();
    })
  }

  componentWillUnmount() {
    const {uid} = this.state;
    firebase.getUsersRef().child(uid).child('foundPosts').off();
  }

  refreshPostlist = () => {
    return firebase.getFoundPostsRef().once('value').then((snapShot) => {
      const list = Object.values(snapShot.val()).reverse();
      this.setState({
        loading: false,
        list
      })
    }).catch((error) => {
      this.setState({loading: false})
    })
  }

  render() {
    const {navigate} = this.props.navigation;
    const loadingOrList = this.state.loading 
      ? <View style={style.loading}>
          <ActivityIndicator animating text='Fetching Items'/>
        </View>
      : <PTRView
          onRefresh={this.refreshPostlist}
          offset={65}
        >
          <Cardgrid navigate={navigate} list={this.state.list}/>
        </PTRView>

    return (
      <View style={style.containerStyle}>
        <Button
          iconLeft
          icon={{name: 'search', size: 26}}
          title='Search'
          fontWeight={'500'}
          containerViewStyle={style.buttonContainer}
          buttonStyle={style.buttonStyle}
          onPress={() => this.props.navigation.navigate('Search', {
            type: this.state.type
          })}
          borderRadius={50}
        />
        {loadingOrList}
      </View>
    );
  }
}

export default FoundPostsScreen;