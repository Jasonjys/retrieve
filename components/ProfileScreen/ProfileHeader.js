import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {ActivityIndicator} from 'antd-mobile';
import { Icon } from 'react-native-elements'
import style from './Style'

class ProfileHeader extends Component {
  handleEditPress = () =>{
    this.props.navigation.navigate('EditProfile', this.props.userInfo)
  }
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
              <View style={{flexDirection: 'row'}}>
                <Text style={style.headerNameStyle}>{displayName}</Text>
                <Icon
                  name='mode-edit'
                  color='white'
                  size={16}
                  style={style.editButtonStyle}
                  onPress={this.handleEditPress}/>
              </View>
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