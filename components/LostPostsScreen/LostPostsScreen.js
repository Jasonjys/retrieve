import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { ActivityIndicator } from 'antd-mobile';
import List from '../List/List';
import {usersRef, lostPostsRef} from '../../firebaseConfig';
import style from './Style';
import PTRView from 'react-native-pull-to-refresh';
import Cardgrid from '../CardGrid/CardGrid';
import currentUser from '../../library/singleton';

class LostPostsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Recent Lost',
    headerRight: <Icon
      name='add-circle'
      color='#e91e63'
      size={35}
      containerStyle={{ marginRight: 12 }}
      onPress={() => navigation.navigate('PostForm', {
        type: "lost"
      })}
    />,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/images/item.png')}
        style={{ tintColor: tintColor }}
      />
    )
  });

  state = {
    type: 'lost',
    loading: true,
    list: []
  }

  componentDidMount() {
    this.refreshPostlist()
    const user = currentUser.getCurrentUser();
    const {uid} = user;
    this.setState({uid})
    usersRef.child(uid).child('lostPosts').on('value', () => {
      this.refreshPostlist();
    })
  }

  componentWillUnmount() {
    const {uid} = this.state;
    usersRef.child(uid).child('lostPosts').off();
  }

  refreshPostlist = () => {
    return new Promise((resolve, reject) => {
      lostPostsRef.once('value').then((snapShot) => {
        var list = Object.values(snapShot.val()).reverse();
        this.setState({
          loading: false,
          list
        }, () => {
          resolve()
        })
      })
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    const loadingOrList = this.state.loading
      ? <View style={style.loading}>
        <ActivityIndicator animating text='Fetching Items' />
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
          icon={{ name: 'search', size: 26 }}
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

export default LostPostsScreen;