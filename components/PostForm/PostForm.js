import React, {Component}from 'react'
import {Text, View, FlatList, TextInput, ScrollView, Image, Button as NativeButton} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {styles} from './styles'
import {FormLabel, FormInput, Badge, Button, Header, FormValidationMessage} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import Tag from './Tag'
import AutoComplete from '../AutoComplete/AutoComplete'
import CameraComponent from './CameraComponent'
import {firebaseApp, usersRef, itemsRef} from '../../firebaseConfig'

export default class PostForm extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'New Post',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../FoundPostsSceen/item.png')}
        style={{tintColor: tintColor}}
      />
    )
  });

  state = {
    title: '',
    description: '',
    tagInput: '',
    errorMessage: '',
    tagArray: [],
    date: new Date(),
    location: {},
    img: '',
    titleErrorMessage: ''
  }

  checkDuplicateTag = (tagName) => {
    return this.state.tagArray.find((tag) => {
      return tagName.toLowerCase() === tag.toLowerCase()
    })
  }

  handleUploadPicture = (img) => {
    this.setState({img: img})
  }

  handleTagSubmit = (tagInput, errorMessage) => {
    if(this.checkDuplicateTag(tagInput)) {
      this.setState({errorMessage: 'Tag already exist!'})
    } else if (!isNaN(tagInput)) {
      this.setState({errorMessage: 'Invalid Tag!'})
    } else {
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
    const locationObject = {
      address: location.vicinity,
      geometry: {...location.latlng}
    }
    this.setState({location: locationObject})
  }

  handleSubmit = () => {
    const {title, description, img, location, tagArray} = this.state
    let {date} = this.state

    if (date instanceof Date) {
      date = date.toISOString().substring(0, 10)
    }
    if (title === '') {
      this.setState({titleErrorMessage: 'Title is required!'})
    } else {
      const newPostKey = itemsRef.push({
        title,
        foundDate: date,
        description,
        img,
        location,
        tagArray
      }).key
  
      const userId = firebaseApp.auth().currentUser.uid;
      const user = usersRef.child(`${userId}`);
  
      user.once('value').then((snapshot) => {
        var foundPosts = snapshot.val().foundPosts;
        if (!foundPosts) {
          user.update({
            foundPosts: [newPostKey]
          })
        } else {
          user.update({
            foundPosts: [...foundPosts, newPostKey]
          })
        }
      });
      this.setState({titleErrorMessage: ''})
      this.props.navigation.navigate('FoundPosts')
    }
  }

  render() {
    let tags = this.handleGenerateTags()
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <FormLabel style={{marginTop: 10}}>Title</FormLabel>
        <FormInput
          placeholder='Enter title here...' 
          containerStyle={{borderBottomWidth: 2}}
          onChangeText={(title)=> this.setState({title})}
        />
        <FormValidationMessage>
            {this.state.titleErrorMessage === '' ? null : this.state.titleErrorMessage }
        </FormValidationMessage>
        <FormLabel>Description</FormLabel>
        <FormInput
          multiline={true}
          numberOfLines = {2}
          inputStyle={{height: 50}}
          containerStyle={{borderBottomWidth: 2}}
          multiline={true}
          placeholder='Found:...'
          autoCapitalize='words'
          onChangeText={(description)=> this.setState({description})}
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
        <FormLabel>Found Date</FormLabel>
        <View style={{margin: 20}}>
          <DatePicker
            style={{width: 200}}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            maxDate={new Date()}
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
            onDateChange={(date) => this.setState({date})}
          />
        </View>
        <CameraComponent onUploadImage={this.handleUploadPicture}/>
        <View style={{alignItems: 'center'}}>
          <Button
            title='Submit'
            buttonStyle={styles.submitButton}
            onPress={this.handleSubmit}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
