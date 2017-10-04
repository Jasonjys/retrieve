import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import MapView from 'react-native-maps'
import AutoComplete from '../AutoComplete/AutoComplete'
import CustomCallout from './CustomCallout'
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
    },
    showSearchBar : true
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
       },
       showSearchBar: false
    })
    this.setState({
      markerLocation: {
        latitude: location.latlng.latitude,
        longitude: location.latlng.longitude
      }
    })
  } 
  render() {

    const list = [
      {
        title: 'Found black Nike bag at 1755 riverside dr',
        description: 'I found a black Nike bag on Bank street, there are some stuff inside, please contact me for more imformation.I found a black Nike bag on Bank street, there are some stuff inside, please contact me for more imformation.I found a black Nike bag on Bank street, there are some stuff inside, please contact me for more imformation.I found a black Nike bag on Bank street, there are some stuff inside, please contact me for more imformation.I found a black Nike bag on Bank street, there are some stuff inside, please contact me for more imformation.',
        img: 'http://media3.newlookassets.com/i/newlook/538303001.jpg',
        date: '2017-09-18',
        location: {
          address: '1755 Riverside Drive, Ottawa, Canada',
          geometry: {
            lat: 45.4019377,
            lng: -75.6652049
          }
        }
      },
      {
        title: 'Found red shoes at Carleton',
        description: 'I found red shoes at Billings, please contact me for more imformation.',
        img: 'https://previews.123rf.com/images/pretoperola/pretoperola1201/pretoperola120100029/11936982-vintage-red-shoes-on-white-background-Stock-Photo-shoes-tennis.jpg',
        date: '2017-09-15',
        location: {
          address: 'Carleton University, Ottawa, ON, Canada',
          geometry: {
            lat: 45.3875812,
            lng: -75.69602019999999
          }
        }
      },
      {
        title: 'Found Macbook pro at TD place',
        description: 'I found a Macbook pro at Rideau, please contact me for more imformation.',
        img: 'https://cnet4.cbsistatic.com/img/zRSypNZhBIJeuedE2_1iMDb0dYc=/770x433/2016/10/27/8facf3fa-d4e1-4221-bdcf-053ad6ce8c2f/apple-macbook-pro-13-inch-2016-1684-017.jpg',
        date: '2017-09-17',
        location: {
          address: 'TD place, Bank street, Ottawa, ON, Canada',
          geometry: {
            lat: 45.3982089,
            lng: -75.6834678
          }
        }
      },
      {
        title: 'Found keys at Billings bridge',
        description: 'I found keys at Rideau, please contact me for more imformation.',
        img: 'https://proudamericans.org/wp-content/uploads/Keys.jpg',
        date: '2017-09-19',
        location: {
          address: 'Billings bridge, Ottawa, ON, Canada',
          geometry: { 
            lat: 45.3859731,
            lng: -75.6779533
          }
        }
      }
    ]
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{height: this.state.showSearchBar ? '65%' : '46%'}}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
          {list.map((marker, key) => (
            <MapView.Marker
              key={key}
              coordinate={{
                latitude: marker.location.geometry.lat,
                longitude: marker.location.geometry.lng
              }}
            >
              <MapView.Callout
                key={key}
                {...marker.location.geometry}>
                <CustomCallout text={marker.title}>
                </CustomCallout>
              </MapView.Callout>
            </MapView.Marker>
          ))}
          <MapView.Marker
            coordinate={{
              latitude: this.state.markerLocation.latitude,
              longitude: this.state.markerLocation.longitude
            }}
            image={require('../../assets/images/currentLocation.png')}
          >
             <MapView.Callout
                {...this.state.markerLocation}>
                <CustomCallout text=''>
                </CustomCallout>
              </MapView.Callout>
          </MapView.Marker>
        </MapView>
        {this.state.showSearchBar ? 
        <View style={{height: "40%", backgroundColor: 'transparent', zIndex: 1}}>
          <AutoComplete setLocation={this.onEnterLocation}/>
        </View> : <ListComponent/>}
      </View>
    );
  }
}

export default Map