import React from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo'
import { Button, Icon } from 'react-native-elements'
import ActionSheet from 'react-native-actionsheet'

export default class App extends React.Component {
  state = {
    image: null,
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
        {this.state.image ? this._maybeRenderImage():
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
            onPress={()=>this.setState({image: ''})}
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
        uploadResponse = await uploadImageAsync(pickerResult.uri)
        uploadResult = await uploadResponse.json();
        this.setState({ image: uploadResult.location });
        this.props.onUploadImage(image)
      }
    } catch (e) {
      // // console.log({ uploadResponse });
      // // console.log({ uploadResult });
      // // console.log({ e });
      // alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
    this.props.onUploadImage(this.state.image)
  }
}

async function uploadImageAsync(uri) {
  let apiUrl = 'https://file-upload-example-backend-qgbeirpxua.now.sh/upload';
  let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}