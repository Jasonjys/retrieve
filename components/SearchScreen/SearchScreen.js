import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import AutoComplete from '../AutoComplete/AutoComplete';
import CategoryPicker from '../CategoryPicker/CategoryPicker';
import style from './Style';
import {NavigationActions} from 'react-navigation';

class Search extends Component {
  state = {
    type: this.props.navigation.state.params.type,
    location: '',
    keyword: '',
    date: '',
    categoryValue: '',
    currentLocationMarker: ''
  }

  onEnterLocation = (location) => {
    this.setState({
      location: {
        latitude: location.latlng.latitude,
        longitude: location.latlng.longitude,
        latitudeDelta: location.latlng.latitudeDelta,
        longitudeDelta: location.latlng.longitudeDelta
       },
       currentLocationMarker: {
          latitude: location.latlng.latitude,
          longitude: location.latlng.longitude
        }
    })
  }

  _onSearchPressed = () => {
    const {location, currentLocationMarker} = this.state;
    if (!location || !currentLocationMarker) {
      Alert.alert("Please enter a location for searching")
    } else {
      this.props.navigation.navigate('Map', this.state)
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView style={style.searchContainer}>
        <FormLabel>Keyword</FormLabel>
        <FormInput
          placeholder='Enter any string here...'
          containerStyle={style.keywordInput}
          onChangeText={keyword => this.setState({keyword})}
        />
        <FormLabel>Date</FormLabel>
        <View style={{margin: 20}}>
          <DatePicker
            style={style.datePickerContainer}
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
                borderWidth: 0,
                borderBottomWidth: 2
              }
            }}
            onDateChange={date => this.setState({date})}
          />
        </View>
        <FormLabel>Location</FormLabel>
        <View style={{margin: 10}}>
          <AutoComplete
            defaultValue={this.state.location}
            setLocation={this.onEnterLocation}
          />
        </View>
        <View style={{margin: 10}}>
          <CategoryPicker
            categoryValue={this.state.categoryValue}
            handleOnChange={(v) => this.setState({categoryValue: v})}
          />
        </View>
        <Button title='Search' onPress={() => this._onSearchPressed()}/>
      </KeyboardAwareScrollView>
    );
  }
}
export default Search
