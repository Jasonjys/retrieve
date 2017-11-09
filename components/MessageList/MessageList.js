import React, {Component}from 'react';
import {Text, View, Image, TouchableHighlight, ScrollView} from 'react-native';
import {ActivityIndicator} from 'antd-mobile';
import {List, Icon} from 'react-native-elements'
import {usersRef} from '../../firebaseConfig';
import style from './Style';
import Swipeable from 'react-native-swipeable';
import MessageListItem from './MessageListItem';
import currentUser from '../../library/singleton';

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
    const user = currentUser.getCurrentUser();
    const {uid, photoURL, displayName} = user;
    this.setState({user: {uid, photoURL, displayName}});
    usersRef.child(uid).child('chat').on('value', (chat) => {
      var chat = chat.val() ? chat.val() : [];
      chat = Object.keys(chat).map((key) => {
        var singleChat = chat[key];
        singleChat.key = key;
        return new Promise((resolve, reolve) => {
          const {contactUID} = singleChat;
          usersRef.child(contactUID).once('value').then((snapShot) => {
            const contactUser = snapShot.val();
            const {displayName, photoURL} = contactUser;
            singleChat.contact = {displayName, photoURL};
            resolve(singleChat);
          })
        })
        resolve(chat[key]);
      })

      Promise.all(chat).then((response) => {
        response.sort((a, b) => {
          return new Date(b.lastModified) - new Date(a.lastModified);
        })

        this.setState({
          loading: false,
          chat: response
        })
      })
    })
  }

  componentWillUnmount() {
    const {user} = this.state;
    const {uid} = user;
    usersRef.child(uid).off();
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
