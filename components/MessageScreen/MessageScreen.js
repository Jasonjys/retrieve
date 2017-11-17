import React, {Component}from 'react';
import {Text, Button, Image} from 'react-native';
import stylefrom from './Style';
import {GiftedChat} from 'react-native-gifted-chat';
import httpRequest from '../../library/httpRequest';
import firebase from '../../library/firebase';

class MessageScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.contact.displayName,
    headerRight: <Button
      onPress={() => {
        const {user, key} = navigation.state.params;
        const {uid} = user;
        firebase.getUsersRef().child(uid).child('chat').child(key).child('messages').remove();
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

  componentWillMount() {
    const {user, contact, contactUID, key} = this.props.navigation.state.params;
    const {uid} = user;
    this.setState({
      user,
      contact : {
        ...contact,
        uid: contactUID
      }
    }, () => {
      firebase.getUsersRef().child(uid).child('chat').child(key).child('messages').on('value', (messages) => {
        messages = messages.val();
        if (messages) {
          this.setState({messages: messages.reverse()});
        } else {
          this.setState({messages: []})
        }
      })
    });
  }

  componentWillUnmount() {
    const {user, key, checkedNewMessage} = this.props.navigation.state.params;
    const {uid} = user;
    firebase.getUsersRef().child(uid).child('chat').child(key).child('messages').off();
    if (checkedNewMessage) {
      checkedNewMessage(key);
    }
  }

  sendMessage = (newMessage) => {
    const {user, contact, messages} = this.state;
    this.setState({messages: [...newMessage, ...messages]}, () => {
      httpRequest('sendMessage', {}, 'POST', JSON.stringify({
        sender: user,
        receiver: contact,
        newMessage
      }))
      .catch((error) => {
        console.log(error);
      })
    });
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
