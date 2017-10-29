import React, {Component} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {FormLabel} from 'react-native-elements'
import style from './Style';
import matchCategory from '../../library/matchCategory';

class DetailPage extends Component {
  render() {
    let {title, img, description, location, category, posterName, date, postDate, email} = this.props.navigation.state.params
    return (
      <ScrollView contentContainerStyle={style.container}>
        {img ? <Image source={{url: img}} style={style.image}/> : null}
        <View style={{width: '100%'}}>
          <FormLabel labelStyle={style.title}>{title}</FormLabel>
          <FormLabel labelStyle={style.infoLabelStyle}>Found on: {date ? date : 'Not provided'}</FormLabel>
          <FormLabel labelStyle={style.infoLabelStyle}>Posted on: {postDate}</FormLabel>
          <FormLabel labelStyle={style.infoLabelStyle}>Category: {category ? matchCategory(category) : 'Not provided'}</FormLabel>
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