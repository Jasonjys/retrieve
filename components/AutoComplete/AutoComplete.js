import React, {Component} from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Geocoder from 'react-native-geocoding'

export default class AutoComplete extends Component {  
    render() {
      Geocoder.setApiKey('AIzaSyBjTDxZGYSrhW6vbTW8mALhx3uIvbvBKbQ')
      return (
        <GooglePlacesAutocomplete
          placeholder='Enter the location where you found the item'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          enablePoweredByContainer={false}
          renderDescription={(row) => row.description || row.vicinity} // custom description render
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          let latLngLocation
            if(data.description){
              Geocoder.getFromLocation(data.description).then(
                json => {
                  latLngLocation = json.results[0].geometry.location
                  this.props.setLocation({latitude: latLngLocation.lat,
                  longitude: latLngLocation.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421})
                },
                error => {
                  alert(error);
                }
              );
            } else {
              latLngLocation = data.geometry.location
              this.props.setLocation({latitude: latLngLocation.lat,
                  longitude: latLngLocation.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421})
            }
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyBjTDxZGYSrhW6vbTW8mALhx3uIvbvBKbQ',
            language: 'en'
          }}
          styles={{
            description: {
              fontWeight: 'bold',
              borderWidth: 0
            },
            container: {
              paddingHorizontal: 10
            },
            textInputContainer: {
              backgroundColor: 'white',
              borderTopWidth: 0,
              borderBottomWidth: 2
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}
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