import React, {Component} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {FormLabel} from 'react-native-elements'
import style from './Style';

class DetailPage extends Component {
  render() {
    let {title, img, description, date, location} = this.props.navigation.state.params
    return (
      <ScrollView contentContainerStyle={style.container}>
        <Image source={{url: img}} style={style.image}/>
        <View style={{alignItems: 'center'}}>
          <FormLabel labelStyle={style.title}>{title}</FormLabel>
          <FormLabel>Found on: {date}</FormLabel>
          {location ? <FormLabel>Found at: {location.address}</FormLabel> : null}
          {description ? <FormLabel>{description}</FormLabel> : null}
        </View>
      </ScrollView>
    );
  }
}

export default DetailPage;