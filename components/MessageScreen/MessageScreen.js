import React, {Component}from 'react';
import {Text, Button, Image} from 'react-native';
import stylefrom from './Style';
import {GiftedChat, Actions} from 'react-native-gifted-chat';
import httpRequest from '../../library/httpRequest';
import firebase from '../../library/firebase';
import {ImagePicker} from 'expo';

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

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      if (!pickerResult.cancelled) {
        console.log(pickerResult)
        uploadResult = await uploadImageAsync(pickerResult.uri);
      }
    } catch (e) {
    } finally {
      if (!pickerResult.cancelled) {
        const {user, messages} = this.state;
        const newMessage = {
          _id: Math.round(Math.random() * 1000000),
          image: uploadResult.location,
          createdAt: new Date(),
          user: {
            _id: user.uid,
            avatar: user.photoURL,
            name: user.displayName
          }
        }
        this.sendMessage([newMessage]);
      }
    }
  }

  renderActions = (props) => {
    const options = {
      "Choose Image": async (props) => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
      },
      "Open Camera": async (props) => {
        let pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
      },
      "Cancel": () => {}
    }
    return (
      <Actions
        {...props}
        options={options}
      />
    )
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
        renderActions={this.renderActions}
        user={{
          _id: user.uid,
          name: user.displayName,
          avatar: user.photoURL
        }}
      />
    );
  }
}

async function uploadImageAsync(uri) {
  let path = "upload";
  let method = "POST";

  let body = new FormData();
  let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];
  body.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };

  return httpRequest(path, {}, method, body, headers);
}

export default MessageScreen;
