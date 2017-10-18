import React, {Component} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {FormLabel} from 'react-native-elements'
import style from './Style';

class DetailPage extends Component {
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
      case 'other':
        return 'Other'
        break;
    }
  }
  render() {
    let {title, img, description, foundDate, location, categoryValue, postDate} = this.props.navigation.state.params
    return (
      <ScrollView contentContainerStyle={style.container}>
        {img ? <Image source={{url: img}} style={style.image}/> : null}
        <View style={{width: '100%'}}>
          <FormLabel labelStyle={style.title}>{title}</FormLabel>
          <FormLabel labelStyle={style.infoLabelStyle}>Found on: {foundDate}</FormLabel>
          <FormLabel labelStyle={style.infoLabelStyle}>Posted on: {postDate}</FormLabel>
          <FormLabel labelStyle={style.infoLabelStyle}>Category: {categoryValue ? this.generateCategory(categoryValue) : 'No Category Provided'}</FormLabel>
          <FormLabel labelStyle={style.infoLabelStyle}>Found at: {location.address ? location.address :'No Address Provided' }</FormLabel>
          <FormLabel labelStyle={style.desStyle}>{description ? description : 'No Description'}</FormLabel>
        </View>
      </ScrollView>
    );
  }
}

export default DetailPage;