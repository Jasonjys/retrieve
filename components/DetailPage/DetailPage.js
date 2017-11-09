import React, {Component} from 'react';
import {FormLabel, Icon} from 'react-native-elements'
import {View, Text, Image, ScrollView, Modal, CameraRoll, ActionSheetIOS, TouchableHighlight} from 'react-native';
import style from './Style';
import ImageViewer from 'react-native-image-zoom-viewer';
import matchCategory from '../../library/matchCategory';
import httpRequest from '../../library/httpRequest';
import {usersRef} from '../../firebaseConfig';
import currentUser from '../../library/singleton';

class DetailPage extends Component {
  state = {
    openModal: false,
    poster: {
      displayName: '',
      email: '',
      photoURL: ''
    }
  }

  componentDidMount() {
    const item = this.props.navigation.state.params
    usersRef.child(item.posterUID).once('value').then((poster) => {
      this.setState({poster: poster.val()})
    })
  }

  chatPressed = () => {
    const {poster} = this.state;
    const item = this.props.navigation.state.params;
    const currentUser = currentUser.getCurrentUser();
    const {uid, displayName, photoURL} = currentUser;
    httpRequest("createChat", {}, 'POST', JSON.stringify({
      uid1: uid,
      uid2: item.posterUID
    })).then((response) => {
      this.props.navigation.navigate('MessageScreen', {
        ...response,
        contact: {uid: item.posterUID, displayName: poster.displayName, photoURL: poster.photoURL},
        user: {uid, displayName, photoURL}
      });
    }).catch((error) => {
      console.log(error);
    })
  }

  handleLongPressImage = (img) => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        "Save image",
        "Cancel"
      ],
      cancelButtonIndex: 1,
    }, (buttonIndex) => {
      switch(buttonIndex) {
        case 0:
          CameraRoll.saveToCameraRoll(img);
          break;
        default:
          break;
      }
    })
  }

  render() {
    const {title, img, description, location, category, date, postDate, posterUID} = this.props.navigation.state.params
    const {displayName, email, photoURL} = this.state.poster
    return (
      <ScrollView contentContainerStyle={style.container}>
        {img ? 
          <TouchableHighlight
            style={style.image}
            onPress={() => this.setState({openModal: true})}
            onLongPress={() => this.handleLongPressImage(img)}
          >
            <Image source={{url: img}} style={{height: '100%'}}/>
          </TouchableHighlight> : null  
        }
        <Modal
          visible={this.state.openModal}
          transparent={true}
        >
          <ImageViewer imageUrls={[{url:img}]} onClick={()=>{this.setState({openModal: false})}}/>
        </Modal>
        <View style={{width: '100%'}}>
          <FormLabel labelStyle={style.title}>{title}</FormLabel>
          <View style={style.posterContainerStyle}>
            <View>
              <Image source={{url: photoURL}} style={style.posterImage}/>
            </View>
            <View style={{flexDirection:'column'}}>
              <Text style={style.posterName}> {displayName}</Text>
              <Text style={style.posterEmail}>{email}</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon
                name='chat'
                style={{marginLeft: '10%'}}
                color='#848484'
                disabled={currentUser.getCurrentUser().uid===posterUID}
                onPress={()=> this.chatPressed()}
              />
            </View>
          </View>
          <FormLabel labelStyle={style.infoLabelStyle}>Found on: {date ? date : 'Not provided'}</FormLabel>
          <FormLabel labelStyle={style.infoLabelStyle}>Posted on: {postDate}</FormLabel>
          <FormLabel labelStyle={style.infoLabelStyle}>Category: {category ? matchCategory(category) : 'Not provided'}</FormLabel>
          <FormLabel labelStyle={style.infoLabelStyle}>Location: {location && location.address ? location.address :'Not provided' }</FormLabel>
          <FormLabel labelStyle={style.desStyle}>{description ? description : 'No Description'}</FormLabel>
        </View>
      </ScrollView>
    );
  }
}

export default DetailPage;