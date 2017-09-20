import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { ImagePicker } from 'expo'
import CameraComponent from './CameraComponent'

class PhotoPicker extends Component {
state = {
    image: null,
}
_pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (!result.cancelled) {
    this.setState({ image: result.uri });
  }
}
  render() {
    let { image } = this.state;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
            />
            {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }
}

export default PhotoPicker;