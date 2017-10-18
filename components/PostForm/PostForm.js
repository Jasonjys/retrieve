import React, {Component}from 'react'
import {View, Image} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import style from './Style'
import {FormLabel, FormInput, Button, FormValidationMessage} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import AutoComplete from '../AutoComplete/AutoComplete'
import {firebaseApp, usersRef, lostPostRef, foundPostRef} from '../../firebaseConfig'
import CameraComponent from '../CameraComponent/CameraComponent'
import CategoryPicker from './CategoryPicker'
import moment from 'moment'

export default class PostForm extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params ? 'Edit Post' : 'New Post',
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
    date: moment().format('YYYY-MM-DD'),
    location: {
      address: ''
    },
    img: '',
    categoryValue: '',
    titleErrorMessage: '',
    type: null
  }

  componentWillMount() {
    const params = this.props.navigation.state.params;
    const { lostOrFound } = params;
    if (params) {
      const {
        title,
        categoryValue,
        description,
        foundDate,
        img,
        location={}
      } = params.post

      this.setState({
        title,
        categoryValue: [categoryValue],
        description,
        date: foundDate,
        img,
        location,
        type
      })
    }
  }

  handleUploadPicture = (img) => {
    this.setState({img: img})
  }

  setLocation = (location) => {
    const locationObject = {
      address: location.vicinity,
      geometry: {...location.latlng}
    }
    this.setState({location: locationObject})
  }

  handleSubmit = () => {
    const {title, description, date, img, location, categoryValue, type} = this.state

    if (!title) {
      this.setState({titleErrorMessage: 'Title is required!'})
    } else {
      var itemsRef = type == "lost" ? lostPostRef : foundPostRef;
      const newPostKey = itemsRef.push({
        title,
        foundDate: date,
        description,
        img,
        location,
        categoryValue: categoryValue[0],
        postDate: moment().format('YYYY-MM-DD HH:mm:ss')
      }).key

      const userId = firebaseApp.auth().currentUser.uid;
      const user = usersRef.child(`${userId}`);

      user.once('value', (snapshot) => {
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
      }).then(() => {
        this.setState({titleErrorMessage: ''})
        this.props.navigation.goBack();
      })
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView style={style.container}>
        <FormLabel style={{marginTop: 10}}>Title</FormLabel>
        <FormInput
          placeholder='Enter title here...' 
          containerStyle={{borderBottomWidth: 2}}
          value={this.state.title}
          onChangeText={(title)=> this.setState({title})}
        />
        <FormValidationMessage>{this.state.titleErrorMessage}</FormValidationMessage>
        <FormLabel>Description</FormLabel>
        <FormInput
          multiline={true}
          numberOfLines = {4}
          value={this.state.description}
          inputStyle={{height: 80, width: '100%'}}
          containerStyle={{borderBottomWidth: 2}}
          multiline={true}
          placeholder='Found:...'
          autoCapitalize='sentences'
          onChangeText={(description)=> this.setState({description})}
        />
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
        <FormLabel>Location</FormLabel>
        <View style={{margin: 10}}>
          <AutoComplete
            defaultValue={this.state.location.address}
            setLocation={this.setLocation}
          />
        </View>
        <CategoryPicker
          categoryValue={this.state.categoryValue}
          handleOnChange={(v) => this.setState({categoryValue: v})}
        />
        <CameraComponent onUploadImage={this.handleUploadPicture}/>
        {this.props.navigation.state.params ? 
          <Button
            title='Save'
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
            onPress={() => console.log("save")}
            style={{width: '100%', height: '50%'}}
          /> : <Button
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
        }
      </KeyboardAwareScrollView>
    );
  }
}
