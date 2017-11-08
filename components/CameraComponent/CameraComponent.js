import React, { Component } from 'react';
import {ActivityIndicator, Clipboard, Image, Share, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo'
import { Button, Icon } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';
import httpRequest from '../../library/httpRequest';

export default class App extends Component {
  state = {
    image: this.props.imageUri,
    uploading: false,
    selected: ''
  }

  showActionSheet = (visible) => {
    this.ActionSheet.show()
  }

  handlePress = (i) => {
    this.setState({
      selected: i
    })
    if(this.state.selected === 1){
      this._pickImage()
    } else if(this.state.selected === 2){
      this._takePhoto()
    }
  }
  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, width: '60%'}}>
        {this.props.changeProfileIcon ?
        <View>
          <Button
         title='Change Photo'
         fontWeight='bold'
         textStyle={{fontSize: 14}}
         buttonStyle={{
              backgroundColor: '#95c2e2',
              margin: 10,
              height: '60%',
              shadowColor: '#000000',
              borderRadius:10}}
         onPress={this.showActionSheet}/>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            options={['Cancel','Photo library', 'Open camera']}
            cancelButtonIndex={0}
            destructiveButtonIndex={4}
            onPress={this.handlePress}/>
         </View> :
          this.state.image ? this._maybeRenderImage() :
            <View>
              <Button
                title='+'
                large
                backgroundColor='white'
                buttonStyle={{
                  borderRadius: 5,
                  margin: 10,
                  borderColor: '#e2e2e2',
                  borderWidth: 1.3,
                  width: 120,
                  height: 120}}
                textStyle={{color: '#938f8f',fontWeight: 'bold'}}
                fontSize={30}
                onPress={this.showActionSheet}>
                </Button>
                <ActionSheet
                ref={o => this.ActionSheet = o}
                options={['Cancel','Photo library', 'Open camera']}
                cancelButtonIndex={0}
                destructiveButtonIndex={4}
                onPress={this.handlePress}
              />
            </View>}
          {this._maybeRenderUploadingOverlay()}
        </View>
      );
    }

    _maybeRenderUploadingOverlay = () => {
      if (this.state.uploading) {
        return (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: 'rgba(0,0,0,0)',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <ActivityIndicator color="black" animating size="large" />
          </View>
      );
    }
  };

  _maybeRenderImage = () => { 
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            overflow: 'hidden',
          }}>
        <Image source={{ uri: image }}
        style={{
          borderRadius: 5,
          margin: 10,
          width: 200,
          height: 200,}}>
          <Icon
            name='clear'
            color='white'
            size={18}
            containerStyle={{
              backgroundColor: 'rgb(204, 204, 204)', 
              height: 25, 
              width: 25, 
              borderRadius: 50,
              opacity: 0.8}}
            onPress={() => {
              this.setState({image: ''})
              this.props.onClearImage()
            }}
          />
          </Image>
        </View>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadResult = await uploadImageAsync(pickerResult.uri)
        this.setState({ image: uploadResult.location });
        this.props.onUploadImage(image)
      }
    } catch (e) {
    } finally {
      this.setState({ uploading: false });
    }
    this.props.onUploadImage(this.state.image)
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