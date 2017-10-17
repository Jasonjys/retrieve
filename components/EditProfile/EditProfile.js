import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {ActivityIndicator} from 'antd-mobile';
import {firebaseApp, usersRef} from '../../firebaseConfig';
import {FormLabel, FormInput, Button} from 'react-native-elements'
import CameraComponent from '../CameraComponent/CameraComponent'
import style from './Style'

class EditProfile extends Component {
  state = {
    name: this.props.navigation.state.params.displayName,
    url: this.props.navigation.state.params.photoURL,
    phoneNumber: this.props.navigation.state.params.phoneNumber
  }

  handleUploadPicture = (url) => {
    this.setState({url})
  }
  handleSave = () =>{
    const user = firebaseApp.auth().currentUser
    user.updateProfile({
      displayName: this.state.name,
      photoURL: this.state.url,
      phoneNumber: this.state.phoneNumber
    }).then(() => {
      const {uid} = firebaseApp.auth().currentUser
      usersRef.child(uid).update({
        displayName: this.state.name,
        photoURL: this.state.url,
        phoneNumber: this.state.phoneNumber
      }).then(() => {
        this.props.navigation.goBack()
      })
    }).catch((error) => {
      // An error happened.
    });
  }

  render() {
    console.log(this.props.navigation.state.params)
    const image = this.state.url ? <Image style={style.IconStyle} source={{uri: this.state.url}}/>
    : <Image style={style.IconStyle} source={require('../../assets/images/user.png')}/>
    return (
      <ScrollView style={{flex:1, backgroundColor: 'white'}}>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>
         <FormLabel>Profile Photo</FormLabel>
          {image}
          <CameraComponent changeProfileIcon={true} onUploadImage={(url)=>this.setState({url})}/>
        </View>
        <FormLabel>Name</FormLabel>
          <FormInput value={this.state.name} onChangeText={(name)=> this.setState({name})}/>
        <FormLabel>Phone Number</FormLabel>
          <FormInput value={this.state.phoneNumber}/>
          <Button
            title='Save'
            fontWeight='bold'
            buttonStyle={{
              backgroundColor: '#ff9eaf',
              margin: 10,
              shadowColor: '#000000',
              borderRadius:10}}
            style={{width: '100%', height: '50%'}}
            onPress={this.handleSave}
          />
      </ScrollView>
    )
  }
}

export default EditProfile;