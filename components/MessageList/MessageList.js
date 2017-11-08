import React, {Component}from 'react';
import {Text, View, Image, TouchableHighlight, ScrollView} from 'react-native';
import {ActivityIndicator} from 'antd-mobile';
import {List, Icon} from 'react-native-elements'
import {firebaseApp, usersRef} from '../../firebaseConfig';
import style from './Style';
import Swipeable from 'react-native-swipeable';
import MessageListItem from './MessageListItem';

class MessageList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Chat',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../../assets/images/ic_chat.png')}
        style={{ tintColor: tintColor }}
      />
    )
  });

  state = {
    loading: true,
    chat: [],
    currentlyOpenItem: null
  }

  componentWillMount() {
    const user = firebaseApp.auth().currentUser;
    const {uid, photoURL, displayName} = user;
    this.setState({user: {uid, photoURL, displayName}}, () => {
      this.fetchMessageList(uid);
    });
    usersRef.child(uid).on('value', (user) => {
      user = user.val() ? user.val() : [];
      var chat = user.chat ? user.chat : [];
      chat = Object.keys(chat).map((key) => {
        chat[key].key = key;
        return chat[key];
      })
      chat.sort((a, b) => {
        return new Date(b.lastModified) - new Date(a.lastModified);
      });
      this.setState({
        loading: false,
        chat
      })
    })
  }

  componentWillUnmount() {
    const {user} = this.state;
    const {uid} = user;
    usersRef.child(uid).off();
  }

  fetchMessageList = (uid) => {
    usersRef.child(uid).child('chat').once('value').then((chat) => {
      chat = chat.val() ? chat.val() : [];
      chat = Object.keys(chat).map((key) => {
        chat[key].key = key;
        return chat[key];
      })
      chat.sort((a, b) => {
        return new Date(b.lastModified) - new Date(a.lastModified);
      });
      this.setState({
        loading: false,
        chat
      });
    })
  }

  deleteChat = (chat) => {
    const {key} = chat;
    const {user} = this.state;
    const {uid} = user;
    usersRef.child(uid).child('chat').child(key).remove();
  }

  render() {
    const {user, chat, loading, currentlyOpenItem} = this.state;
    const loadingOrList = loading
    ? <View style={style.loading}>
        <ActivityIndicator animating text='Loading chats'/>
      </View>
    : <ScrollView Style={style.listContainer}>
        {
          chat.map((item, key) => (
            <MessageListItem
              key={item.key}
              index={key}
              item={item}
              onDelete={this.deleteChat}
              onPress={() => this.props.navigation.navigate('MessageScreen', {
                ...item,
                key: item.key,
                user
              })}
              onOpen={listItem => {
                if (currentlyOpenItem && currentlyOpenItem !== listItem) {
                  currentlyOpenItem.recenter();
                }
                this.setState({currentlyOpenItem: listItem});
              }}
              onClose={() => this.setState({currentlyOpenItem: null})}
            />
          ))
        }
      </ScrollView>

    return (
      <View style={{height: '100%', backgroundColor: 'white'}}>
        {loadingOrList}
      </View>
    );
  }
}

export default MessageList;
