import React, {Component}from 'react'
import {View, Image} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import style, {dateStyle} from './Style'
import {FormLabel, FormInput, Button, FormValidationMessage} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import AutoComplete from '../AutoComplete/AutoComplete'
import {firebaseApp, usersRef, lostPostsRef, foundPostsRef} from '../../firebaseConfig'
import CameraComponent from '../CameraComponent/CameraComponent'
import CategoryPicker from '../CategoryPicker/CategoryPicker';
import moment from 'moment'

class PostForm extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.post ? 'Edit Post' : 'New Post',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../../assets/images/item.png')}
        style={{tintColor: tintColor}}
      />
    )
  });

  state = {
    title: '',
    img: null,
    location: {
      address: '',
      geometry: {
        latitude: '',
        longitude: ''
      }
    },
    date: '',
    description: '',
    categoryValue: '',
    titleErrorMessage: '',
  }

  componentWillMount() {
    const params = this.props.navigation.state.params;
    const {type} = params;
    this.setState({type});

    if (params.post) {
      const {
        title,
        categoryValue,
        description,
        date,
        location={}
      } = params.post

      this.setState({
        title,
        categoryValue: [categoryValue],
        description,
        date,
        img: params.post.img || null,
        location
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
  
  handleSave = () => {
    const {title, description, date, img, location, categoryValue} = this.state
    const {id} = this.props.navigation.state.params.post;

    if(!title) {
      this.setState({titleErrorMessage: 'Title is required!'})
    } else {
      foundPostsRef.child(id).update({
        title,
        date,
        description,
        img,
        location,
        categoryValue: categoryValue[0],
      }).then(() => this.props.navigation.goBack())
    } 
  }

  handleSubmit = () => {
    const {title, description, date, img, location, categoryValue, type} = this.state

    if (!title) {
      this.setState({titleErrorMessage: 'Title is required!'})
    } else {
      const userId = firebaseApp.auth().currentUser.uid;
      const user = usersRef.child(userId);

      var itemsRef = type === "lost" ? lostPostsRef : foundPostsRef;

      const newPostKey = itemsRef.push({
        title,
        description,
        img,
        date,
        location,
        categoryValue: categoryValue[0],
        postDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        user: userId
      }).key

      user.once('value').then((snapshot) => {
        if (type === "found") {
          const foundPosts = snapshot.val().foundPosts ? snapshot.val().foundPosts : [];
          user.update({
            foundPosts: [...foundPosts, newPostKey]
          })
        } else {
          const lostPosts = snapshot.val().lostPosts ? snapshot.val().lostPosts : [];
          user.update({
            lostPosts: [...lostPosts, newPostKey]
          })
        }
      });
      this.setState({titleErrorMessage: ''})
      this.props.navigation.goBack();
    }
  }

  render() {
    const {params} = this.props.navigation.state
    const {type} = params
    return (
      <KeyboardAwareScrollView style={style.container}>
        <FormLabel>{type === 'found' || params.post ? 'Found Date' : 'Lost Date'}</FormLabel>
        <View style={{marginTop: 10, marginLeft: 20, marginRight: 20}}>
          <DatePicker
            style={{width: 200}}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            maxDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={dateStyle}
            onDateChange={(date) => this.setState({date})}
          />
        </View>
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
          placeholder={type === 'found' || params.post ? 'Found...' : 'Lost...'}
          multiline={true}
          numberOfLines = {4}
          value={this.state.description}
          inputStyle={{height: 80, width: '100%'}}
          containerStyle={{borderBottomWidth: 2}}
          multiline={true}
          onChangeText={(description)=> this.setState({description})}
        />
        <FormLabel>Location</FormLabel>
        <View style={{margin: 10}}>
          <AutoComplete
            placeholder={type === 'found' || params.post ? 'Enter found location' : 'Enter lost location'}
            defaultValue={this.state.location.address}
            setLocation={this.setLocation}
          />
        </View>
        <CategoryPicker
          categoryValue={this.state.categoryValue}
          handleOnChange={(v) => this.setState({categoryValue: v})}
        />
        <CameraComponent imageUri={this.state.img} onUploadImage={this.handleUploadPicture}/>
        {params.post ? 
          <Button
            title='Save'
            buttonStyle={style.buttonStyle}
            onPress={this.handleSave}
          /> :
          <Button
            title='Submit'
            buttonStyle={style.buttonStyle}
            onPress={this.handleSubmit}
          />
        }
      </KeyboardAwareScrollView>
    );
  }
}

export default PostForm;