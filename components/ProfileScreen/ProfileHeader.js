import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {ActivityIndicator} from 'antd-mobile';
import style from './Style'

class ProfileHeader extends Component {
  render() {
    if (this.props.userInfo) {
      const {displayName, email, photoURL, phoneNumber} = this.props.userInfo;
      const image = photoURL ? <Image style={style.profilePicStyle} source={{uri: photoURL}}/>
      : <Image style={style.profilePicStyle} source={require('../../assets/images/user.png')}/>
      return (
        <Image
          style={style.headerBackgroundStyle}
          source={require('../../assets/images/header3.jpg')}
        >
          <View style={style.headerContainerStyle}>
            {image}
            <View style={style.textBackgroundStyle}>
              <Text style={style.headerNameStyle}>{displayName}</Text>
              <Text style={style.emailAndTelStyle}>{email}</Text>
              <Text style={style.emailAndTelStyle}>{phoneNumber}</Text>
            </View>
          </View>
        </Image>
      );
    } else {
      return (
        <View style={style.headerContainerStyle}>
          <ActivityIndicator animating />
        </View>
      );
    }
  }
}

export default ProfileHeader;