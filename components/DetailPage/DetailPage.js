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
    let {title, img, description, foundDate, location, categoryValue} = this.props.navigation.state.params
    return (
      <ScrollView contentContainerStyle={style.container}>
        <Image source={{url: img}} style={style.image}/>
        <View style={{alignItems: 'center'}}>
          <FormLabel labelStyle={style.title}>{title}</FormLabel>
          <FormLabel>Found on: {foundDate}</FormLabel>
          {categoryValue?  <FormLabel>Category: {this.generateCategory(categoryValue)}</FormLabel>
            : <FormLabel>No Category Provided</FormLabel>}
          {!location ? <FormLabel>Found at: {location.address}</FormLabel>
            :<FormLabel>No Address Provided</FormLabel> }
          {description ? <FormLabel labelStyle={style.desStyle}>{description}</FormLabel>
            : <FormLabel>No Description Provided</FormLabel>}
        </View>
      </ScrollView>
    );
  }
}

export default DetailPage;