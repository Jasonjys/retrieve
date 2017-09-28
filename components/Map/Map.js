import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import MapView from 'react-native-maps'
import AutoComplete from '../AutoComplete/AutoComplete'
import BottomSheet from './BottomSheet'
import ListComponent from '../List/ListComponent'

class Map extends Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    markerLocation: {
      latitude: 37.78825,
      longitude: -122.4324
    }
  }
  onRegionChange = (region) => {
    this.setState({region})
  }
  onEnterLocation = (location) => {
    this.setState({
      region: {
        latitude: location.latlng.latitude,
        longitude: location.latlng.longitude,
        latitudeDelta: location.latlng.latitudeDelta,
        longitudeDelta: location.latlng.longitudeDelta
       }
    })
    this.setState({
      markerLocation: {
        latitude: location.latlng.latitude,
        longitude: location.latlng.longitude
      }
    })
  } 
  render() {
    let fakeCoordinate = [{
      address: '1755 Riverside Drive, Ottawa, Canada',
      geometry: {
        lat: 45.4019377,
        lng: -75.6652049
      }},{
        address: 'Carleton University, Ottawa, ON, Canada',
        geometry: {
          lat: 45.3875812,
          lng: -75.69602019999999
        }
      },{
        address: 'Billings bridge, Ottawa, ON, Canada',
        geometry: { 
          lat: 45.3859731,
          lng: -75.6779533
        }
      },{
        address: 'TD place, Bank street, Ottawa, ON, Canada',
        geometry: {
          lat: 45.3982089,
          lng: -75.6834678
        }
      }]
  
    return (
      <View style={{
        flex: 1
      }}>
        <View
          style={{
          justifyContent: 'flex-end',
          height: '40%',
          zIndex: 100
        }}>
          <AutoComplete setLocation={this.onEnterLocation}/>
        </View>
        <MapView
          style={{
          height: '100%',
          marginTop: -240
        }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}>
          <MapView.Marker          
            coordinate={{
              latitude: this.state.markerLocation.latitude,
              longitude: this.state.markerLocation.longitude
            }}
            image={require('./currentLocation.png')}
          />
          {fakeCoordinate.map((marker, key) => (
          <MapView.Marker
          key={key}
          coordinate={{
              latitude: marker.geometry.lat,
              longitude: marker.geometry.lng
            }}
            title={marker.address}
          />
        ))}
          </MapView>
          <ListComponent style={{height: '100%', width: '100%', marginTop: -200, zIndex: 200}}/>
      </View>
    );
  }
}

export default Map