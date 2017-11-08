import React, {Component} from 'react';
import {View, Text, Image, ScrollView, Modal, TouchableHighlight} from 'react-native';
import {FormLabel, Icon} from 'react-native-elements'
import style from './Style';
import ImageViewer from 'react-native-image-zoom-viewer';
import matchCategory from '../../library/matchCategory';
import httpRequest from '../../library/httpRequest';
import {firebaseApp, usersRef} from '../../firebaseConfig';

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
    const currentUser = firebaseApp.auth().currentUser;
    const {uid, displayName, photoURL} = currentUser;
    httpRequest("createChat", {}, 'POST', JSON.stringify({
      user1: {uid, displayName, photoURL},
      user2: {uid: item.posterUID, displayName: poster.displayName, photoURL: poster.photoURL}
    })).then((response) => {
      this.props.navigation.navigate('MessageScreen', {
        ...response,
        user: {uid, displayName, photoURL}
      });
    }).catch((error) => {
      console.log(error);
    })
  }

  render() {
    let {title, img, description, location, category, date, postDate} = this.props.navigation.state.params
    const {displayName, email, photoURL} = this.state.poster
    return (
      <ScrollView contentContainerStyle={style.container}>
              <View style={{marginLeft: '5%', marginTop: '2%', flexDirection: 'row'}}>
          <View>
            <Image source={{url: photoURL}} style={{height: 60, width: 60, borderRadius: 30}}/>
          </View>
          <View style={{flexDirection:'column', marginLeft: '4%'}}>
            <Text style={{marginTop: '15%', fontSize: 16, fontWeight: 'bold'}}> {displayName}</Text>
            <Text style={{fontSize: 12, color: '#919191'}}>{email}</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              name='chat'
              style={{marginLeft: '10%'}}
              color='#848484'
              onPress={()=> this.chatPressed()}/>
          </View>
        </View>
        {img ? <TouchableHighlight style={style.image} onPress={()=>this.setState({openModal: true})}>
          <Image source={{url: img}} style={{height: '100%'}}/>
          </ TouchableHighlight>: null}
        <Modal
          visible={this.state.openModal}
          transparent={true}
          >
            <ImageViewer imageUrls={[{url:img}]} onClick={()=>{this.setState({openModal: false})}}/>
          </Modal>
        <View style={{width: '100%'}}>
          <FormLabel labelStyle={style.title}>{title}</FormLabel>
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