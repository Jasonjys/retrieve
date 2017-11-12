import React, {Component}from 'react';
import {Text, View, Image, TouchableHighlight, ScrollView} from 'react-native';
import {List, Icon} from 'react-native-elements'
import {usersRef} from '../../firebaseConfig';
import style from './Style';
import Swipeable from 'react-native-swipeable';
import MessageListItem from './MessageListItem';
import currentUser from '../../library/singleton';

class MessageList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Chat',
    tabBarIcon: ({tintColor}) => {
      const {params = {}} = navigation.state;
      return (
      <Image
        source={
          require('../../assets/images/ic_chat.png')
          }
        style={{ tintColor: tintColor }}
      />)
    }
  });

  state = {
    chat: [],
    currentlyOpenItem: null
  }

  componentWillMount() {
    const user = currentUser.getCurrentUser();
    const {uid, photoURL, displayName} = user;
    this.setState({user: {uid, photoURL, displayName}});

    usersRef.child(uid).child('chat').on('child_added', (snapShot) => {
      const singleChat = snapShot.val() ? snapShot.val() : [];
      const key = snapShot.key;
      const promise = new Promise((resolve, reject) => {
        singleChat.key = key;
        const {contactUID} = singleChat;
        usersRef.child(contactUID).once('value').then((snapShot) => {
          const contactUser = snapShot.val();
          const {displayName, photoURL} = contactUser;
          singleChat.contact = {displayName, photoURL};
          resolve(singleChat)
        })
      })
      Promise.all([promise]).then((singleChat) => {
        let {chat = []} = this.state;
        chat = [...singleChat, ...chat];
        chat.sort((a, b) => {return new Date(b.lastModified) - new Date(a.lastModified);})
        this.setState({chat});
      })
    })

    usersRef.child(uid).child('chat').on('child_removed', (snapShot) => {
      const key = snapShot.key;
      const {chat = []} = this.state;
      const index = chat.indexOf(chat.find((singleChat) => {
        return singleChat.key === key
      }))
      if (index !== -1) {
        this.setState({
          chat: [
          ...chat.splice(0, index),
          ...chat.splice(index + 1, chat.length)
          ]
        })
      }
    })
  }

  componentWillUnmount() {
    const {user} = this.state;
    const {uid} = user;
    usersRef.child(uid).child('chat').off();
  }

  deleteChat = (chat) => {
    const {key} = chat;
    const {user} = this.state;
    const {uid} = user;
    usersRef.child(uid).child('chat').child(key).remove();
  }

  receiveNewMessage = (messages, chatKey, receivedNewMessage) => {
    const {chat} = this.state;
    const oldChat = chat.find((singleChat) => {
      return singleChat.key === chatKey;
    });
    const index = chat.indexOf(oldChat);
    this.setState({
      chat: [
        {
          ...oldChat,
          messages
        },
        ...chat.splice(0, index),
        ...chat.splice(index + 1, chat.length)
      ]
    }, () => {
      this.props.navigation.setParams({receivedNewMessage});
    })
  }

  render() {
    const {user, chat, loading, currentlyOpenItem} = this.state;
    const list =
      <ScrollView Style={style.listContainer}>
        {
          chat.map((item, key) => (
            <MessageListItem
              key={item.key}
              index={key}
              item={item}
              user={user}
              receiveNewMessage={this.receiveNewMessage}
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
        {list}
      </View>
    );
  }
}

export default MessageList;
