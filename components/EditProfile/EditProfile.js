import React, {Component} from 'react';
import {
  View,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {ActivityIndicator} from 'antd-mobile';
import {FormLabel, FormInput, Button, FormValidationMessage} from 'react-native-elements'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CameraComponent from '../CameraComponent/CameraComponent'
import style from './Style'
import ImageViewer from 'react-native-image-zoom-viewer';
import firebase from '../../library/firebase';

class EditProfile extends Component {
  state = {
    name: this.props.navigation.state.params.displayName,
    email: this.props.navigation.state.params.email,
    url: this.props.navigation.state.params.photoURL || '',
    phoneNumber: this.props.navigation.state.params.phoneNumber || '',
    openModal: false,
    emailError: ''
  }

  handleUploadPicture = (url) => {
    this.setState({url})
  }
  handleSave = () => {
    const {name, url, phoneNumber, email} = this.state
    if (!email) {
      this.setState({emailError: 'Email is required!'})
      return
    }
    const user = firebase.getCurrentUser();
    const {uid} = user
    user.updateProfile({displayName: name, photoURL: url, phoneNumber, email})
    .then(() => {
      firebase.usersRef.child(uid)
        .update({displayName: name, photoURL: url, phoneNumber, email})
        .then(() => {
          this.props.navigation.goBack()
        })
    })
    .catch((error) => {
      // An error happened.
      console.log(error)
    });
  }

  render() {
    const image = this.state.url
      ? <Image
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 100,
            borderColor: 'rgba(0,0,0, 0.4)',
            borderWidth: 6
          }}
          source={{uri: this.state.url}}
        />
      : <Image source={require('../../assets/images/user.png')} style={style.iconStyle}/>
    return (
      <KeyboardAwareScrollView style={style.scrollViewStyle}>
        <View style={style.centerImageStyle}>
          <FormLabel>Profile Photo</FormLabel>
          <TouchableHighlight
            style={style.touchableHeighlightStyle}
            onPress={()=>{
              if(this.state.url){
                this.setState({openModal: true})}
              }
            }
            underlayColor='rgba(0, 0, 0, 0)'>
            {image}
          </TouchableHighlight>
          <Modal visible={this.state.openModal} transparent={true}>
            <ImageViewer
              imageUrls={[{
                url: this.state.url
              }
            ]}
              onClick={() => {
              this.setState({openModal: false})
            }}/>
          </Modal>
          <CameraComponent
            changeProfileIcon={true}
            onUploadImage={(url) => this.setState({url})}/>
        </View>
        <FormLabel>Name</FormLabel>
        <FormInput
          value={this.state.name}
          onChangeText={(name) => this.setState({name})}/>
        <FormLabel>Phone Number</FormLabel>
        <FormInput
          value={this.state.phoneNumber}
          onChangeText={(phoneNumber) => this.setState({phoneNumber})}/>
        <FormLabel>Email</FormLabel>
        <FormInput
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
        />
        {this.state.emailError ? <FormValidationMessage>{this.state.emailError}</FormValidationMessage> : null}
        <Button
          title='Save'
          fontWeight='bold'
          buttonStyle={style.saveButtonStyle}
          onPress={this.handleSave}/>
      </KeyboardAwareScrollView>
    )
  }
}

export default EditProfile;