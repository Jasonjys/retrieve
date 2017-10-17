import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {ActivityIndicator} from 'antd-mobile';
import {FormLabel, FormInput} from 'react-native-elements'

class EditProfile extends Component {

  render() {
    console.log(this.props)
    let {displayName, email, phoneNumber, photoURL} = this.props.navigation.state.params
    const image = photoURL ? <Image style={{    flex: 1,
      alignItems: 'center',
      width: 140,
      borderRadius: 100,
      borderColor: 'rgba(0,0,0, 0.4)',
      borderWidth: 6}} source={{uri: photoURL}}/>
    : <Image style={{    flex: 1,
      alignItems: 'center',
      width: 140,
      borderRadius: 100,
      borderColor: 'rgba(0,0,0, 0.4)',
      borderWidth: 6}} source={require('../../assets/images/user.png')}/>
    return (
      <View>
        <FormLabel>Current Profile Picture</FormLabel>
        {image}
        <FormLabel>Name</FormLabel>
          <FormInput value={displayName}/>
        <FormLabel>Phone Number</FormLabel>
          <FormInput value={phoneNumber}/>
      </View>
    )
  }
}

export default EditProfile;