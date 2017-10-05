import React, {Component} from 'react';
import {View} from 'react-native';
import AutoComplete from '../AutoComplete/AutoComplete';

class TemSearch extends Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.100,
      longitudeDelta: 0.0521
    }, 
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
    this.props.navigation.navigate('Map',this.state)
  }

  render() {
    return (
      <View>
        <View style={{height: 300, backgroundColor: 'transparent', zIndex: 1}}>
          <AutoComplete setLocation={this.onEnterLocation}/>
        </View>
      </View>
    );
  }
}
export default TemSearch
