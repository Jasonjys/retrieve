import React, {Component}from 'react';
import {Text, View, Image, TouchableHighlight, ScrollView} from 'react-native';
import {List, Icon} from 'react-native-elements';
import style from './Style';
import Swipeable from 'react-native-swipeable';
import MessageListItem from './MessageListItem';
import firebase from '../../library/firebase';

class MessageList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Chat',
    tabBarIcon: ({tintColor}) => {
      const {params = {}} = navigation.state;
      const {list} = params;
      return (
        <Image
          source={
            list && list.length ?
              require('../../assets/images/ic_chat_notification.png') :
              require('../../assets/images/ic_chat.png')
          }
          style={{tintColor: tintColor}}
        />
      )
    }
  });

  state = {
    loading: true,
    chat: [],
    currentlyOpenItem: null
  }

  componentDidMount() {
    const user = firebase.getCurrentUser();
    const {uid, photoURL, displayName} = user;
    this.setState({user: {uid, photoURL, displayName}});

    firebase.usersRef.child(uid).child('chat').on('value', (snapShot) => {
      const chat = snapShot.val() ? snapShot.val() : [];
      const key = snapShot.key;
      const promise = Object.keys(chat).map((key) => {
        const {contactUID} = chat[key];
        return firebase.usersRef.child(contactUID).once('value').then((snapShot) => {
          const contactUser = snapShot.val();
          const {displayName, photoURL} = contactUser;
          return {
            ...chat[key],
            key,
            contact: {displayName, photoURL}
          }
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
    firebase.usersRef.child(uid).child('chat').off();
  }

  deleteChat = (chat) => {
    const {key} = chat;
    const {user} = this.state;
    const {uid} = user;
    firebase.usersRef.child(uid).child('chat').child(key).remove();
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
      chat.length ?
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
      </ScrollView> :
      <View style={style.contentContainerStyle}>
        <Text style={{marginTop: '50%', fontSize: 18, color: '#bababa'}}>
          You don't have any chat at the moment.
          To create a chat, please go to the detail post page and click the chat button.
        </Text>
      </View>

    return (
      <View style={{height: '100%', backgroundColor: 'white'}}>
        {list}
      </View>
    );
  }
}

export default MessageList;
