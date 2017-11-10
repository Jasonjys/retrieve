import React, {Component}from 'react';
import {Text, Button, Image} from 'react-native';
import stylefrom from './Style';
import {GiftedChat} from 'react-native-gifted-chat';
import httpRequest from '../../library/httpRequest';
import {usersRef} from '../../firebaseConfig';

class MessageScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.contact.displayName,
    headerRight: <Button
      onPress={() => {
        const {user, key} = navigation.state.params;
        const {uid} = user;
        usersRef.child(uid).child('chat').child(key).child('messages').remove();
      }}
      title='Clear'
    />
  });

  state = {
    user: {
      uid: '',
      displayName: '',
      photoURL: ''
    }
  }

  componentDidMount() {
    const {user, contact, contactUID, messages, key} = this.props.navigation.state.params;
    const {uid} = user;
    this.setState({
      user,
      contact : {
        ...contact,
        uid: contactUID
      },
      messages: messages.reverse()
    }, () => {
    usersRef.child(uid).child('chat').child(key).child('messages').on('child_added', (newMessage) => {
      newMessage = newMessage.val();
      const {messages} = this.state;
      if (newMessage) {
        const exist = messages.find((message) => {
          return message._id === newMessage._id;
        })
        if (!exist) {
          this.setState({messages: [newMessage, ...messages]});
        }
      }
    })
  });
  }

  componentWillUnmount() {
    const {user, key} = this.props.navigation.state.params;
    const {uid} = user;
    usersRef.child(uid).child('chat').child(key).off();
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
        onSend={(messages) => this.sendMessage(messages)}
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
