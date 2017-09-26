import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import MapView from 'react-native-maps'
import AutoComplete from '../PostForm/AutoComplete'

class Map extends Component {
    state = {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
    }
    onRegionChange = (region) => {
        this.setState({region});
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View
                    style={{
                    justifyContent: 'flex-end',
                    height: '30%',
                    zIndex: 100
                }}>
                    <AutoComplete setLocation={this.onRegionChange}/>
                </View>
                <MapView
                    style={{
                    height: '100%',
                    marginTop: -200
                }}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}>
                </MapView>
            </View>
        );
    }
}

export default Map