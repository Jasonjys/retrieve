import React, {Component}from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, ScrollView} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from './styles'
import { FormLabel, FormInput, Badge, Button, Header } from 'react-native-elements'
import StatusBar from './StatusBar'

export default class PostForm extends Component {
 state = {
   title: '',
   Description: '',
   tagInput: '',
   tagArray: []
 }
 handleTagEditing = () => {
  this.state.tagArray.push(this.state.tagInput)
  this.setState({tagInput: ''})
  console.log(this.state.tagArray)
 }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <StatusBar title='New Post' />
        <FormLabel style={{marginTop: 10}}>Title</FormLabel>
        <FormInput placeholder='Enter title here...' onChangeText={(value)=>{this.setState({'title': value})}} />
        <FormLabel>Description</FormLabel>
        <FormInput
          multiline={true}
          numberOfLines = {4}
          inputStyle={{height: 100}}
          multiline={true}
          placeholder='Found:...'
          onChangeText={(value)=>{
            this.setState({'Description': value})
            console.log('sdklf')}}
          />
        <FormLabel>Location</FormLabel>
        <FormInput placeholder='will be an autocomplete component later'/>
        <FormLabel>Date</FormLabel>
        <FormInput placeholder='Might be date picker later'/>
        {/* might gonna change to a component that similar to drag and drop  */}
        <Button
          title='Upload pictures'
          style={{marginBottom: 20, marginTop: 20}}/>
        <FormLabel>Tags</FormLabel>
        <FormInput
          containerStyle={{marginBottom: 20}}
          onChangeText={(value)=>{this.setState({'tagInput': value})}}
          blurOnSubmit={true}
          onSubmitEditing={this.handleTagEditing}
          clearButtonMode={"while-editing"}
          value={this.state.tagInput}/>
        <View style={{flex:1, width: 100, margin: 10, padding: 10}}>
          <Badge containerStyle={{ backgroundColor: 'violet', height: 40}}>
            <Text>User 1</Text>
          </Badge>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{ flexDirection: 'row'}}>
            <Button
              title='Submit'
              style={{marginBottom: 20, marginTop: 20}}/>
            <Button
              title='Cancel'
              style={{marginBottom: 20, marginTop: 20}}/>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
