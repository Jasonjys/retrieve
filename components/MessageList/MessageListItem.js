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
      if (messages[messagesLength].user._id !== uid) {
        this.setState({receivedNewMessage: true, messagesLength: messages.length}, () => {
          receiveNewMessage(item.key);
        })
      }
    }
  }

  checkNewMessage = (index) => {
    const {checkedNewMessage} = this.props
    this.setState({receivedNewMessage: false}, () => {
      checkedNewMessage(index);
    })
  }


  render() {
    const {onOpen, onClose, onPress, onDelete, viewdNewMessage, item} = this.props;
    const {contact, messages, lastModified} = item;
    const {receivedNewMessage} = this.state;
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
            this.checkNewMessage(item.key);
            onPress();
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
            <View style={style.textContainerStyle}>
              <Text style={style.textUserNameStyle}>
                {contact.displayName}
              </Text>
              {messages ?
                <View style={{flexDirection: 'row'}}>
                  <Text style={style.textMessageStyle} numberOfLines={1}>
                    {receivedNewMessage ? <Text style={{color: 'red'}}> New </Text> : null}
                    {messages[messages.length - 1].text}
                  </Text>
                  <Text style={style.textMessageStyle}>{checkTime(lastModified)}</Text>
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