import React, {Component} from 'react';
import {View, Button, Text, Image, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import style from './Style';
import moment from "moment";
import checkTime from '../../library/checkTime'

class MessageListItem extends Component {
  swipeable = null

  recenter() {
    if (this.swipeable) {
      this.swipeable.recenter()
    }
  }

  componentWillMount() {
    const {item, user} = this.props;
    const {uid} = user;
    const {messages = [], key} = item;
    this.setState({uid, key,
      messagesLength: messages.length,
      receivedNewMessage: false
    });
  }

  componentWillReceiveProps(newProps) {
    const {receiveNewMessage} = this.props;
    const {item} = newProps;
    const {messages = []} = item;
    const {messagesLength = 0, uid} = this.state;
    if (messages.length > messagesLength) {
      let receivedNewMessage = false;
      if (messages[messagesLength].user._id !== uid) {
        receivedNewMessage = true;
      }
      this.setState({receivedNewMessage, messagesLength: messages.length}, () => {
        receiveNewMessage(item.key);
      })
    }
  }

  render() {
    const {onOpen, onClose, onPress, onDelete, viewdNewMessage, item} = this.props;
    const {contact, messages, lastModified} = item;
    const {receivedNewMessage} = this.state;
    const lastMessage = messages[messages.length - 1].text ? messages[messages.length - 1].text : "[Image]";
    return (
      <Swipeable
        onRef={ref => this.swipeable = ref}
        onRightButtonsOpenRelease={() => onOpen(this)}
        onRightButtonsCloseRelease={() => onClose(this)}
        rightButtons={[
          <TouchableHighlight
            underlayColor='#ff9eaf'
            style={style.deleteButtonContainerStyle}
            onPress={() => onDelete(item)}
          >
            <View style={style.buttonContainerViewStyle}>
              <Icon color="white" name='delete' size={33}/>
            </View>
          </TouchableHighlight>
        ]}
      >
        <TouchableHighlight
          onPress={() => {
            this.setState({receivedNewMessage: false}, () => {
              onPress();
            })
          }}
          underlayColor='#e5e5e5'>
          <View style={style.listItemStyle}>
            {contact.photoURL ? 
              <Image
                source={{uri: contact.photoURL}}
                style={style.imageStyle}
              /> :
              <Image
                source={require('../../assets/images/account_circle.png')}
                style={style.imageStyle}
              />
            }
            <View style={style.messageContainerStyle}>
              <View style={style.messageTitleContainer}>
                <Text style={style.textUserNameStyle}>
                  {contact.displayName} 
                </Text>
                <Text style={style.textDateStyle}>{checkTime(lastModified)}</Text>
              </View>
              {messages ?
                <View style={style.textMessageContainer}>
                  <Text numberOfLines={1} style={{flex: 1}}>
                    {lastMessage}
                  </Text>
                  {receivedNewMessage ? <Text style={{color: 'red'}}>New</Text> : null}
                </View> : null
              }
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    );
  }
}

export default MessageListItem;