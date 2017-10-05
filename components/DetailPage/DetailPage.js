import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { FormLabel, Badge, Button} from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class DetailPage extends Component {
  render() {
    let {title, img, description, date, location} = this.props.navigation.state.params
    return (
      <ScrollView contentContainerStyle={{height: '100%', alignItems: 'center', backgroundColor: 'white'}}>
        <Image source={{url: img}} style={{ height: 300, width: 300 }}/>
        <View style={{alignItems: 'center'}}>
          <FormLabel labelStyle={{fontSize: 30, color: 'black', fontWeight: '800', textAlign: 'center'}}> {title} </FormLabel>
          <FormLabel> Date: {date} </FormLabel>
          <FormLabel labelStyle={{textAlign: 'center'}}> Location: {location.address}</FormLabel>
          <FormLabel> {description} </FormLabel>
        </View>
      </ScrollView>
    );
  }
}

export default DetailPage;