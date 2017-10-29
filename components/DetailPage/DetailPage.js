import React, {Component} from 'react';
import {View, Image, ScrollView, Modal, TouchableHighlight, Text} from 'react-native';
import {FormLabel} from 'react-native-elements'
import style from './Style';
import ImageViewer from 'react-native-image-zoom-viewer';

class DetailPage extends Component {
  state = {
    openModal: false
  }
  generateCategory = (category) => {
    switch (category){
      case 'eletronic':
        return 'Eletronic'
        break;
      case 'clothingShoes':
        return 'Clothing/Shoes'
        break;
      case 'supply':
        return 'School/Office Supply'
        break;
      case 'jewelry':
        return 'Jewelry & Watch';
        break;
      case 'wck':
        return 'Wallet/Card/Key'
        break;
      case 'pet':
        return 'Pet'
        break;
      case 'bag':
        return 'Bag'
        break;
      case 'others':
        return 'Others'
        break;
    }
  }
  render() {
    let {title, img, description, location, categoryValue, posterName, date, postDate, email} = this.props.navigation.state.params
    return (
      <ScrollView contentContainerStyle={style.container}>
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
          <FormLabel labelStyle={style.infoLabelStyle}>Category: {categoryValue ? this.generateCategory(categoryValue) : 'Not provided'}</FormLabel>
          <FormLabel labelStyle={style.infoLabelStyle}>Location: {location && location.address ? location.address :'Not provided' }</FormLabel>
          <FormLabel labelStyle={style.desStyle}>{description ? description : 'No Description'}</FormLabel>
          <FormLabel labelStyle={style.posterStyle}> Posted by: {posterName}</FormLabel>
          <FormLabel labelStyle={style.posterStyle}> Email: {email ? email : 'No Email'}</FormLabel>
        </View>
      </ScrollView>
    );
  }
}

export default DetailPage;