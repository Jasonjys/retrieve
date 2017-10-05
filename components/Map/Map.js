import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native'
import MapView from 'react-native-maps'
import AutoComplete from '../AutoComplete/AutoComplete'
import {Button} from 'react-native-elements'
import ListComponent from '../List/ListComponent'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import BottomItemDetail from './BottomItemDetail'

class Map extends Component {
  state = {
    region: {
      latitude: this.props.navigation.state.params.region.latitude,
      longitude: this.props.navigation.state.params.region.longitude,
      latitudeDelta: this.props.navigation.state.params.region.latitudeDelta,
      longitudeDelta: this.props.navigation.state.params.region.longitudeDelta
    },
    currentLocationMarker: {
      latitude: this.props.navigation.state.params.region.latitude,
      longitude: this.props.navigation.state.params.region.longitude
    },
    showList: false,
    markerPress: -1
  }

  onRegionChange = (region) => {
    this.setState({region})
  }

  generateFakeList = () => {
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
    return list
  }
  handleLongPress = () => {
    
  }
  generateUnexpendList = (key) => {
    //Just incase two style will be different, will change it back if there is no different
    let expandListButtonStyle = {
      backgroundColor: 'white',
      height: '40%',
      alignItems: 'center',
      paddingHorizontal: 10,
      flex: 1
    }
    let itemDetailStyle = {
      backgroundColor: 'white',
      height: '40%',
      alignItems: 'center',
      paddingHorizontal: 10,
      flex: 1
    }
    return(
      this.state.markerPress === -1 ?
      <TouchableHighlight
      onPress={()=>{
        if(this.state.markerPress === -1){
          this.setState({showList: true})
        }
      }}
      style={this.state.markerPress === -1 ? expandListButtonStyle: itemDetailStyle}
      underlayColor='#d6d7d8'>
        <Text style={{fontSize: 18, marginTop: '5%',fontWeight: '900'}} >Expand list</Text>
      </TouchableHighlight>
      : <BottomItemDetail navigate={this.props.navigation.navigate} detail={this.generateFakeList()[key]}/>
    )
  }
  render() {
    return (
      <View style={{flex: 1, width: '100%'}}>
        <MapView
          style={{height: this.state.showList ? '55%' : this.state.markerPress === -1 ? '88%' : '88%'}}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChange}
          onPress={()=>{
            if(this.state.showList){
              this.setState({showList: !this.state.showList})
            } else {
              this.setState({markerPress: -1})
            }
          }}
        >
          {this.generateFakeList().map((marker, key) => (
            <MapView.Marker
              key={key}
              coordinate={{
                latitude: marker.location.geometry.lat,
                longitude: marker.location.geometry.lng
              }}
              onPress={(e)=>{
                e.stopPropagation()
                this.setState({
                  markerPress: key,
                  showList: false})
              }}
              
            >
              <MapView.Callout>
                <Text>{key}</Text>
              </MapView.Callout>
            </MapView.Marker>
          ))}
          <MapView.Marker
            coordinate={{
              latitude: this.state.currentLocationMarker.latitude,
              longitude: this.state.currentLocationMarker.longitude
            }}
            
            image={require('../../assets/images/currentLocation.png')}
          >
          </MapView.Marker>
        </MapView>
        {this.state.showList ?
          <ListComponent navigate={this.props.navigation.navigate} handleLongPress={this.handleLongPress}/> 
            : this.generateUnexpendList(this.state.markerPress)
        }
      </View>
    );
  }
}

export default Map