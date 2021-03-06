import React, {Component} from 'react';
import {View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import Geocoder from 'react-native-geocoding'
import style from './Style'

class AutoComplete extends Component {
  render() {
    Geocoder.setApiKey('AIzaSyBjTDxZGYSrhW6vbTW8mALhx3uIvbvBKbQ')
    return (
      <GooglePlacesAutocomplete
        placeholder={this.props.placeholder}
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='false'    // true/false/undefined
        fetchDetails={true}
        enablePoweredByContainer={false}
        renderDescription={(row) => row.description || row.vicinity} // custom description render
        getDefaultValue={() => this.props.defaultValue} // text input default value
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          let latLngLocation
          if (data.description) {
            Geocoder.getFromLocation(data.description).then(
              json => {
                latLngLocation = json.results[0].geometry.location
                this.props.setLocation({
                  vicinity: data.description,
                  latlng: {
                    latitude: latLngLocation.lat,
                    longitude: latLngLocation.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                  }
                })
              },
              error => {
                alert(error);
              }
            );
          } else {
            latLngLocation = data.geometry.location
            this.props.setLocation({
              vicinity: data.vicinity,
              latlng: {
                latitude: latLngLocation.lat,
                longitude: latLngLocation.lng,
                latitudeDelta: 0.100,
                longitudeDelta: 0.0521
              }
            })
          }
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyBjTDxZGYSrhW6vbTW8mALhx3uIvbvBKbQ',
          language: 'en'
        }}
        styles={style}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    )
  }
}

export default AutoComplete