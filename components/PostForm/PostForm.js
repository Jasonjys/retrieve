import React, {Component}from 'react'
import {View, Image, TextInput} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import style, {dateStyle} from './Style'
import {FormLabel, FormInput, Button, Icon, FormValidationMessage} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import AutoComplete from '../AutoComplete/AutoComplete'
import {firebaseApp, usersRef, lostPostsRef, foundPostsRef} from '../../firebaseConfig'
import CameraComponent from '../CameraComponent/CameraComponent'
import CategoryPicker from '../CategoryPicker/CategoryPicker'
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
    category: '',
    titleErrorMessage: '',
    categoryErrorMessage: ''
  }

  componentWillMount() {
    const params = this.props.navigation.state.params;
    const {type} = params;
    this.setState({type});

    if (params.post) {
      const {
        title,
        category,
        description,
        date,
        location={}
      } = params.post

      this.setState({
        title,
        category: [category],
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
    //todo found and lost update
    const {title, description, date, img, location, category, type} = this.state
    const {post, found} = this.props.navigation.state.params; 
    
    console.log(found)

    if(!title || !category) {
      this.setState({titleErrorMessage: 'Title is required!'})
      this.setState({categoryErrorMessage: 'Category is required!'})
      return;
    } else {
      var itemsRef = !found ? lostPostsRef : foundPostsRef;
        itemsRef.child(post.id).update({
        title,
        date,
        description,
        img,
        location,
        category: category[0],
      }).then(() => this.props.navigation.goBack())
    }
  }

  handleSubmit = () => {
    const {title, description, date, img, location, category, type} = this.state

    if (!title || !category) {
      this.setState({titleErrorMessage: 'Title is required!'})
      this.setState({categoryErrorMessage: 'Category is required!'})
      return;
    } else {
      const currentUser = firebaseApp.auth().currentUser;
      const {uid, email, displayName, photoURL} = currentUser;
      const user = usersRef.child(uid);

      var itemsRef = type === "lost" ? lostPostsRef : foundPostsRef;
      const newPostKey = itemsRef.push({
        title,
        description,
        img,
        date,
        location,
        category: category[0],
        postDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        posterUID: uid
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
      this.props.navigation.goBack();
    }
  }

  render() {
    const {params} = this.props.navigation.state
    const {titleErrorMessage, categoryErrorMessage} = this.state
    const {type} = params
    return (
      <KeyboardAwareScrollView style={style.container}>
        <FormLabel>{type === 'found' || params.post ? 'Found Date' : 'Lost Date'}</FormLabel>
        <View style={style.datePicker}>
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
          <Icon
            name='clear'
            color='#000'
            size={20}
            onPress={()=>{this.setState({date:""})}}
          />
        </View>
        <FormLabel style={{marginTop: 10}}>Title</FormLabel>
        <TextInput
          placeholder='Enter title here...'
          value={this.state.title}
          style={style.input}
          clearButtonMode= "while-editing"
          onChangeText={(title)=> this.setState({title})}
        />
        {titleErrorMessage ? <FormValidationMessage>{titleErrorMessage}</FormValidationMessage> : null}
        <FormLabel>Description</FormLabel>
        <TextInput
          multiline={true}
          numberOfLines = {4}
          value={this.state.description}
          placeholder={type === 'found' || params.post ? 'Found...' : 'Lost...'}
          style={[style.input, {height: 80, fontSize: 16}]}
          clearButtonMode= "while-editing"
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
          categoryValue={this.state.category}
          handleOnChange={(v) => this.setState({category: v})}
          handleOnDismiss={() => this.setState({category: ""})}
        />
        {categoryErrorMessage ? <FormValidationMessage>{categoryErrorMessage}</FormValidationMessage> : null}
        <CameraComponent 
          imageUri={this.state.img}
          onUploadImage={this.handleUploadPicture}
          onClearImage={() => this.setState({img: null})}
        />
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