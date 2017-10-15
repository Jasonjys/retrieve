import React, {Component} from 'react';
import {View, Button, Text, Image, StyleSheet} from 'react-native';
import {ActivityIndicator, WingBlank} from 'antd-mobile';
import {firebaseApp} from '../../firebaseConfig';

class ProfileHeader extends Component {
  _onPressButton() {
    //alert('You tapped the button!')
  }

  render() {
    if (this.props.userInfo) {
      const {displayName, email, photoURL, phoneNumber} = this.props.userInfo;
      const image = photoURL ? <Image style={styles.profilepic} source={{uri: photoURL}}/>
      : <Image style={styles.profileDefault} source={require('../../assets/images/user.png')}/>
      return (
        <Image
          style={styles.headerBackground}
          source={require('../../assets/images/header3.jpg')}
        >
          <View style={styles.header}>
            {image}
            <View style={styles.textbackground}>
              <Text style={styles.name}>{displayName}</Text>
              <Text style={styles.emailAndTel}>{email}</Text>
              <Text style={styles.emailAndTel}>{phoneNumber}</Text>
            </View>
          </View>
        </Image>
      );
    } else {
      return (
        <View style={styles.header}>
          <ActivityIndicator animating />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerBackground: {
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  profilepic: {
    flex: 1,
    alignItems: 'center',
    width: 140,
    alignSelf: 'stretch',
    borderRadius: 100,
    borderColor: 'rgba(0,0,0, 0.4)',
    borderWidth: 6
  },
  profileDefault: {
    flex: 1,
    width: 140,
    borderRadius: 100,
    borderColor: 'rgba(0,0,0, 0.4)',
    borderWidth: 6
  },
  textbackground: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center'
  },
  name: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  emailAndTel: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '300',
    fontStyle: 'italic'
  }

  // button: {     marginLeft: 300, }
});

export default ProfileHeader;