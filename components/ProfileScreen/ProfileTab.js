import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import style from './Style';

class ProfileTab extends Component {
  render() {
    return (
      <View style={style.tab}>
        <TouchableOpacity style={{width: '50%'}} onPress={()=>this.props.onPressTab(true)}>
          <View
            style={[
            style.tabItem, {
              backgroundColor: '#95c2e2'
            }
          ]}>
            <Text style={style.tabFont}>Found</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{width: '50%'}} onPress={()=>this.props.onPressTab(false)}>
          <View
            style={[
            style.tabItem, {
              backgroundColor: '#ff9eaf'
            }
          ]}>
            <Text style={style.tabFont}>Lost</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ProfileTab;