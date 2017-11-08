import React, {Component}from 'react';
import {Text, TouchableHighlight, Image} from 'react-native';
import stylefrom from './Style';
import {GiftedChat} from 'react-native-gifted-chat';
import httpRequest from '../../library/httpRequest';
import {usersRef} from '../../firebaseConfig';

class MessageScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Chat with ' + navigation.state.params.contact.displayName,
    headerRight: <TouchableHighlight
      onPress={() => {
        const {user, key} = navigation.state.params;
        const {uid} = user;
        usersRef.child(uid).child('chat').child(key).child('messages').remove();
      }}
    >
      <Text>
        Clear history
      </Text>
    </TouchableHighlight>
  });

  componentWillMount() {
    const {user, contact, messages, key} = this.props.navigation.state.params;
    console.log(contact)
    const {uid} = user;
    this.setState({
      user,
      contact,
      messages
    });
    usersRef.child(uid).child('chat').child(key).on('value', (newMessages) => {
      const chatInfo = newMessages.val();
      if (chatInfo) {
        const messages = chatInfo.messages ? chatInfo.messages : [];
        this.setState({messages});
      }
    })
  }

  componentWillUnmount() {
    const {user, key} = this.props.navigation.state.params;
    const {uid} = user;
    usersRef.child(uid).child('chat').child(key).off();
  }

  onSend(newMessage = []) {
    const {messages} = this.state;
    this.setState({
      messages: GiftedChat.append(messages, newMessage),
    }, () => {
      this.sendMessage(newMessage)
    });
  }

  sendMessage = (newMessage) => {
    const {user, contact} = this.state;
    httpRequest('sendMessage', {}, 'POST', JSON.stringify({
      sender: user,
      receiver: contact,
      newMessage
    }))
    .then()
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    const {user} = this.state;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        placeholder="Enter your message here..."
        showUserAvatar={true}
        renderAvatarOnTop={true}
        user={{
          _id: user.uid,
          name: user.displayName,
          avatar: user.photoURL
        }}
      />
    );
  }
}

export default MessageScreen;
