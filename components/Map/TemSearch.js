import React, {Component} from 'react';
import {View} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import AutoComplete from '../AutoComplete/AutoComplete';
import CategoryPicker from '../CategoryPicker/CategoryPicker';

class TemSearch extends Component {
  state = {
    currentLocationMarker: {
      latitude: 37.78825,
      longitude: -122.4324
    }
  }

  onEnterLocation = (location) => {
    this.setState({
      region: {
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

  render() {
    return (
      <KeyboardAwareScrollView style={{flex: 1, height: '100%', backgroundColor: 'white'}}>
        <FormLabel>Key Word</FormLabel>
        <FormInput
          placeholder='Enter any string here...' 
          containerStyle={{borderBottomWidth: 2}}
          onChangeText={keyword => this.setState({keyword})}
        />
        <FormLabel>Date</FormLabel>
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
                borderWidth: 0,
                borderBottomWidth: 2
              }
            }}
            onDateChange={date => this.setState({date})}
          />
        </View>
        <FormLabel>Location</FormLabel>
        <View style={{margin: 10}}>
          <AutoComplete defaultValue='' setLocation={this.onEnterLocation}/>
        </View>
        <CategoryPicker
          categoryValue={this.state.categoryValue}
          handleOnChange={(v) => this.setState({categoryValue: v})}
        />
        <Button title='Search' onPress={() => this.props.navigation.navigate('Map', this.state)}/>
      </KeyboardAwareScrollView>
    );
  }
}
export default TemSearch
