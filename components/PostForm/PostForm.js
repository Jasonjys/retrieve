import React, {Component}from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, ScrollView} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from './styles'
import { FormLabel, FormInput, Badge, Button, Header, FormValidationMessage } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import StatusBar from './StatusBar'
import Tag from './Tag'
import AutoComplete from './AutoComplete'
import PhotoPicker from './PhotoPicker'
import CameraComponent from './CameraComponent'

export default class PostForm extends Component {
 state = {
    title: '',
    Description: '',
    tagInput: '',
    errorMessage: '',
    tagArray: [],
    date: "2016-05-15",
    location: {},
    img: ''
 }
 checkDuplicateTag = (tagName) => {
   return this.state.tagArray.find((tag) => {
     return tagName.toLowerCase() === tag.toLowerCase()
   })
 }

 currentTime = () => {
  var today = new Date()
  return today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
 }
handleUploadPicture = (img) => {
  this.setState({img: img})
}
 handleTagSubmit = (tagInput, errorMessage) => {
  if(this.checkDuplicateTag(tagInput)) {
    this.setState({errorMessage: 'Tag already exist!'})
  } else if (!isNaN(tagInput)){
    this.setState({errorMessage: 'Invalid Tag!'})
  }else {
    this.setState({errorMessage: ''})
    this.state.tagArray.push(tagInput)
    this.setState({tagInput: ''})
  }
 }
handleGenerateTags = () => {
    return (
      <View style={{flexDirection: 'row', flexWrap:'wrap'}}>
        {this.state.tagArray.map((tag, key) => (
              <Badge key={key} containerStyle={{ backgroundColor: 'violet', height: 40, margin: 10}}
                onPress={() => {
                let arr = this.state.tagArray.filter((tag, index) => {
                  return index !== key
                })
                this.setState({tagArray: arr})
              }}
              value={tag}>
              </Badge>
        ))}
      </View>
    );
}

setLocation = (location) => {
  this.setState({location: location})
}
  render() {
    let tags = this.handleGenerateTags()
    console.log(this.state.location)
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <StatusBar title='New Post' />
        <FormLabel style={{marginTop: 10}}>Title</FormLabel>
        <FormInput placeholder='Enter title here...' 
        containerStyle={{borderBottomWidth: 2}}
        onChangeText={(value)=>{this.setState({'title': value})}} />
        <FormLabel>Description</FormLabel>
        <FormInput
          multiline={true}
          numberOfLines = {2}
          inputStyle={{height: 50}}
          containerStyle={{borderBottomWidth: 2}}
          multiline={true}
          placeholder='Found:...'
          autoCapitalize='words'
          onChangeText={(value)=>{
            this.setState({'Description': value})}}
          />
          <Tag 
          onChangeText={(value) => this.setState({tagInput: value})}
          onTagSubmit={this.handleTagSubmit}
          tagInput={this.state.tagInput}
          errorMessage={this.state.errorMessage}
          tags={tags}
        />
        <FormLabel>Location</FormLabel>
        <View style={{margin: 10}}>
          <AutoComplete setLocation={this.setLocation}/>
        </View>
        <FormLabel>Date</FormLabel>
        <View style={{margin: 20}}>
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          maxDate={this.currentTime()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 50,
              borderWidth: 0,
              borderBottomWidth: 2
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        </View>
        <CameraComponent onUploadImage={this.handleUploadPicture}/>
        <View style={{alignItems: 'center'}}>
          <View style={{ flexDirection: 'row'}}>
            <Button
              title='Submit'
              buttonStyle={{
              backgroundColor: '#b26aed',
              margin: 10,
              shadowColor: '#000000',
              borderRadius:10,
              shadowOffset: {
                width: 0,
                height: 3
              },
              shadowRadius: 5,
              shadowOpacity: 0.3}}/>
              <Button
                title='Cancel'
                buttonStyle={{
                backgroundColor: 'grey',
                margin: 10,
                shadowColor: '#000000',
                borderRadius:10,
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowRadius: 5,
                shadowOpacity: 0.3}}/>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
