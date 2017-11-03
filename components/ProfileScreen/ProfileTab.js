import React, {Component} from 'react';
import {View, TouchableOpacity, Text, TouchableHighlight} from 'react-native';
import style from './Style';

class ProfileTab extends Component {
  render() {
    return (
      <View style={style.tab}>
        <TouchableHighlight style={{width: '50%'}} onPress={()=>this.props.onPressTab(true)} underlayColor='#95c2e2'>
          <View
            style={[
              style.tabItem, {
                backgroundColor: '#aad1ed'
              }
            ]}
          >
            <Text style={style.tabFont}>Found {this.props.found}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={{width: '50%'}} onPress={()=>this.props.onPressTab(false)} underlayColor='#f4bac4'>
          <View
            style={[
            style.tabItem, {
              backgroundColor: '#ffc1cc'
            }
          ]}>
            <Text style={style.tabFont}>Lost {this.props.lost}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default ProfileTab;