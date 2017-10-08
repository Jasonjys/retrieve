import React, {Component}from 'react'
import {View, Image} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import style from './Style'
import {FormLabel, FormInput, Badge, Button, FormValidationMessage} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import Tag from './Tag'
import AutoComplete from '../AutoComplete/AutoComplete'
import CameraComponent from './CameraComponent'
import {firebaseApp, usersRef, itemsRef} from '../../firebaseConfig'
import CategoryPicker from './CategoryPicker'

export default class PostForm extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'New Post',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../../assets/images/item.png')}
        style={{tintColor: tintColor}}
      />
    )
  });

  state = {
    title: '',
    description: '',
    tagInput: '',
    errorMessage: '',
    date: new Date(),
    location: {},
    img: '',
    categoryValue: '',
    titleErrorMessage: ''
  }

  // checkDuplicateTag = (tagName) => {
  //   return this.state.tagArray.find((tag) => {
  //     return tagName.toLowerCase() === tag.toLowerCase()
  //   })
  // }

  handleUploadPicture = (img) => {
    this.setState({img: img})
  }

  // handleTagSubmit = (tagInput, errorMessage) => {
  //   if(this.checkDuplicateTag(tagInput)) {
  //     this.setState({errorMessage: 'Tag already exist!'})
  //   } else if (!isNaN(tagInput)) {
  //     this.setState({errorMessage: 'Invalid Tag!'})
  //   } else {
  //     this.setState({errorMessage: ''})
  //     this.state.tagArray.push(tagInput)
  //     this.setState({tagInput: ''})
  //   }
  // }
  // handleGenerateTags = () => {
  //   return (
  //     <View style={{flexDirection: 'row', flexWrap:'wrap'}}>
  //       {this.state.tagArray.map((tag, key) => (
  //         <Badge key={key} containerStyle={{ backgroundColor: 'violet', height: 40, margin: 10}}
  //           onPress={() => {
  //             let arr = this.state.tagArray.filter((tag, index) => {
  //               return index !== key
  //             })
  //             this.setState({tagArray: arr})
  //           }}
  //           value={tag}>
  //         </Badge>
  //       ))}
  //     </View>
  //   );
  // }

  setLocation = (location) => {
    const locationObject = {
      address: location.vicinity,
      geometry: {...location.latlng}
    }
    this.setState({location: locationObject})
  }

  handleSubmit = () => {
    const {title, description, img, location, tagArray, categoryValue} = this.state
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
        categoryValue: categoryValue[0]
      }).key

      const userId = firebaseApp.auth().currentUser.uid;
      const user = usersRef.child(`${userId}`);

      user.once('value').then((snapshot) => {
        const foundPosts = snapshot.val().foundPosts;
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
    return (
      <KeyboardAwareScrollView style={style.container}>
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
          numberOfLines = {4}
          inputStyle={{height: 80, width: '100%'}}
          containerStyle={{borderBottomWidth: 2}}
          multiline={true}
          placeholder='Found:...'
          autoCapitalize='words'
          onChangeText={(description)=> this.setState({description})}
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
        <CategoryPicker
          categoryValue={this.state.categoryValue}
          handleOnChange={(v)=>{
            this.setState({categoryValue: v})}}/>
        <CameraComponent onUploadImage={this.handleUploadPicture}/>
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
              shadowOpacity: 0.3}}
            onPress={this.handleSubmit}
            style={{width: '100%', height: '50%'}}
          />
      </KeyboardAwareScrollView>
    );
  }
}
