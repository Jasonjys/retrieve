import React, {Component} from 'react';
import {View, Button, Text, Image, TouchableHighlight} from 'react-native';
import { Icon } from 'react-native-elements'
import Swipeable from 'react-native-swipeable';
import {firebaseApp} from '../../firebaseConfig';


class SwipeList extends Component {

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    const rightButtons = [
      <TouchableHighlight style={{backgroundColor: '#c4e6ff',flex: 1}}>
          <View style={{width: 50, height: 90, alignItems: 'center',justifyContent: 'center', marginLeft: '3%'}}>
            <Icon name='create'color="white" size={33}/>
          </View>
        </TouchableHighlight>,
      <TouchableHighlight style={{backgroundColor: '#ffc1cc'}}>
        <View style={{width: 50, height: 90, alignItems: 'center',justifyContent: 'center', marginLeft: '3%'}}>
          <Icon color="white" name='delete' size={33}/>
        </View>
      </TouchableHighlight>
    ];
    return (
      <View>
        {this.props.list.map((item, key) => (
          <Swipeable key={key} rightButtons={rightButtons}>
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 90}}>
              <Image 
                source={{uri: item.img}}
                style={{height: 50, width: 50, borderRadius:25}}
              />
              <View style={{width: '70%',flexWrap: 'wrap', paddingBottom: '4%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text 
                    numberOfLines={2}
                    style={{fontWeight: '900', fontSize: 18, margin: 10,textAlign: 'center',flexWrap: 'wrap'}}
                  >
                    {item.title}
                  </Text>
              </View>
            </View>
            <View style={{width: '100%', borderBottomColor: '#d8d8d8', borderBottomWidth: 0.2}}/>
          </Swipeable>
        ))}
      </View>
    );
  }
}

export default SwipeList;