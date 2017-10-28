import React, {Component} from 'react'
import {Text, View, TouchableHighlight, Image} from 'react-native'
import MapView from 'react-native-maps'
import AutoComplete from '../AutoComplete/AutoComplete'
import List from '../List/List'
import BottomItemDetail from './BottomItemDetail'
import DropdownAlert from 'react-native-dropdownalert'
import httpRequest from '../../library/httpRequest';
import style from './MapStyle'

class Map extends Component {
  state = {
    list: [],
    currentLocationMarker: {
      latitude: this.props.navigation.state.params.currentLocationMarker.latitude,
      longitude: this.props.navigation.state.params.currentLocationMarker.longitude
    },
    location: {
      latitude: this.props.navigation.state.params.location.latitude,
      longitude: this.props.navigation.state.params.location.longitude,
      latitudeDelta: this.props.navigation.state.params.location.latitudeDelta,
      longitudeDelta: this.props.navigation.state.params.location.longitudeDelta
    },
    showList: false,
    markerPress: -1,
    listOpenTime: 0
  }

  componentDidMount() {
    const {date, keyword, category, location, type} = this.props.navigation.state.params;
    httpRequest(type, {date, location, keyword, category})
    .then((post) => {
      this.setState({
        list: post
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onLocationChange = (location) => {
    this.setState({location})
  }

  handleLongPress = (key) => {
    if(this.state.list[key].location.address){
      let {latitude, longitude} = this.state.list[key].location.geometry
      this.setState({
        location: {
          ...this.state.location,
          latitude: latitude,
          longitude: longitude
        },
        currentLocationMarker: {
          latitude: latitude,
          longitude: longitude
        }
      })
    } else {
      this.dropdown.alertWithType('error', '', 'This item does not provide location');
    }
  }
  generateUnexpendList = (key) => {
    return(
      this.state.markerPress === -1 
      ?
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
        style={style.itemDetailStyle}
        underlayColor='#d6d7d8'
      >
        <View style={style.expandListContainerStyle}>
          <Text style={style.expandListTextStyle} >Expand list</Text>
        </View>
      </TouchableHighlight>
      : <BottomItemDetail navigate={this.props.navigation.navigate} detail={this.state.list[key]}/>
    )
  }
  render() {
    return (
      <View style={style.containerStyle}>
        <MapView
          style={{height: this.state.showList ? '55%' : '88%'}}
          region={this.state.location}
          onLocationChange={this.onLocationChange}
          onLocationChangeComplete={this.onLocationChange}
          onPress={()=>{
            if(this.state.showList){
              this.setState({showList: !this.state.showList})
            } else {
              this.setState({markerPress: -1})
            }
          }}
        >
          {this.state.list.length ? this.state.list.map((item, key) => (
            item.location && item.location.address ?
            <MapView.Marker
              key={key}
              coordinate={{
                latitude: item.location.geometry.latitude,
                longitude: item.location.geometry.longitude
              }}
              onPress={(e)=>{
                e.stopPropagation()
                this.setState({
                  markerPress: key,
                  location: {
                    ...this.state.location,
                    latitude: item.location.geometry.latitude,
                    longitude: item.location.geometry.longitude
                  },
                  showList: false})
              }}
            /> : null
          )) : null}
          <MapView.Marker
            coordinate={{
              latitude: this.state.currentLocationMarker.latitude,
              longitude: this.state.currentLocationMarker.longitude
            }}
            image={require('../../assets/images/currentLocation.png')}
          />
        </MapView>
        {this.state.showList
          ? <List list={this.state.list} navigate={this.props.navigation.navigate} handleLongPress={this.handleLongPress}/> 
          : this.generateUnexpendList(this.state.markerPress)
        }
        <DropdownAlert
          ref={ref => this.dropdown = ref }
          activeStatusBarStyle='default'
          closeInterval={3000}
          titleStyle={style.dropAlertTitleStyle}/>
      </View>
    );
  }
}

export default Map