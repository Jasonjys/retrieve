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
      const {list = []} = params;
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

    usersRef.child(uid).child('chat').on('value', (snapShot) => {
      const chat = snapShot.val() ? snapShot.val() : [];
      const key = snapShot.key;
      const promise = Object.keys(chat).map((key) => {
        return new Promise((resolve, reject) => {
          let singleChat = chat[key];
          singleChat.key = key;
          const {contactUID} = singleChat;
          usersRef.child(contactUID).once('value').then((snapShot) => {
            const contactUser = snapShot.val();
            const {displayName, photoURL} = contactUser;
            singleChat.contact = {displayName, photoURL};
            resolve(singleChat)
          })
        })
      })
      Promise.all(promise).then((chat) => {
        chat.sort((a, b) => {return new Date(b.lastModified) - new Date(a.lastModified);})
        this.setState({chat});
      })
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

  receiveNewMessage = (chatKey) => {
    const {params = {}} = this.props.navigation.state;
    const {list = []} = params;
    if (list.indexOf(chatKey) === -1) {
      this.props.navigation.setParams({"list": [...list, chatKey]});
    }
  }

  checkedNewMessage = (key) => {
    const {params = {}} = this.props.navigation.state;
    const {list = []} = params;
    const index = list.indexOf(key);
    if (index !== -1) {
      this.props.navigation.setParams({list: [
        ...list.splice(0, index),
        ...list.splice(index + 1, list.length)
      ]});
    }
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
              checkedNewMessage={this.checkedNewMessage}
              onDelete={this.deleteChat}
              onPress={() => this.props.navigation.navigate('MessageScreen', {
                ...item,
                key: item.key,
                checkedNewMessage: this.checkedNewMessage,
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
