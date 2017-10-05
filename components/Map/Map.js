import React, {Component} from 'react'
import {Text, View, TouchableHighlight, Image} from 'react-native'
import MapView from 'react-native-maps'
import AutoComplete from '../AutoComplete/AutoComplete'
import List from '../List/List'
import {fakeList} from '../List/mockList'
import BottomItemDetail from './BottomItemDetail'
import DropdownAlert from 'react-native-dropdownalert'

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
    markerPress: -1,
    listOpenTime: 0
  }

  onRegionChange = (region) => {
    this.setState({region})
  }

  handleLongPress = (key) => {
    let {lat, lng} = fakeList[key].location.geometry
    this.setState({
      region: {
        ...this.state.region, 
        latitude: lat,
        longitude: lng
      },
      currentLocationMarker: {
        latitude: lat,
        longitude: lng
      }
    })
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
          this.setState({
            showList: true,
            listOpenTime: ++this.state.listOpenTime
          })
          if(this.state.listOpenTime === 1) {
            this.dropdown.alertWithType('info', 'Tip', 'Long press to see item location');
          }
        }
      }}
      style={this.state.markerPress === -1 ? expandListButtonStyle: itemDetailStyle}
      underlayColor='#d6d7d8'>
        <Text style={{fontSize: 18, marginTop: '5%',fontWeight: '900'}} >Expand list</Text>
      </TouchableHighlight>
      : <BottomItemDetail navigate={this.props.navigation.navigate} detail={fakeList[key]}/>
    )
  }
  render() {
    return (
      <View style={{flex: 1, width: '100%'}}>
        <MapView
          style={{height: this.state.showList ? '55%' : '88%'}}
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
          {fakeList.map((marker, key) => (
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
            />
          ))}
          <MapView.Marker
            coordinate={{
              latitude: this.state.currentLocationMarker.latitude,
              longitude: this.state.currentLocationMarker.longitude
            }}
            image={require('../../assets/images/currentLocation.png')}
          />
        </MapView>
        {this.state.showList ?
            <List navigate={this.props.navigation.navigate} handleLongPress={this.handleLongPress}/> 
            : this.generateUnexpendList(this.state.markerPress)
        }
        <DropdownAlert
          ref={ref => this.dropdown = ref }
          activeStatusBarStyle='default'
          closeInterval={3000}
          titleStyle={{marginTop: -10, color: 'white', fontWeight: '900'}}/>
      </View>
    );
  }
}

export default Map