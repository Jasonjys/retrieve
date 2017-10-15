import React, {Component} from 'react';
import {View, Button, Text, Image, TouchableHighlight} from 'react-native';
import { Icon } from 'react-native-elements'
import Swipeable from 'react-native-swipeable';
import {firebaseApp} from '../../firebaseConfig';
import style from './Style'

class SwipeList extends Component {

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    const rightButtons = [
      <TouchableHighlight style={style.editButtonContainerStyle}>
          <View style={style.buttonContainerViewStyle}>
            <Icon name='create'color="white" size={33}/>
          </View>
        </TouchableHighlight>,
      <TouchableHighlight style={style.deleteButtonContainerStyle}>
        <View style={style.buttonContainerViewStyle}>
          <Icon color="white" name='delete' size={33}/>
        </View>
      </TouchableHighlight>
    ];
    return (
      <View>
        {this.props.list.map((item, key) => (
          <Swipeable key={key} rightButtons={rightButtons}>
            <View style={style.listItemStyle}>
              <Image 
                source={{uri: item.img}}
                style={style.imageStyle}
              />
              <View style={style.textContainerStyle}>
                  <Text 
                    numberOfLines={2}
                    style={style.textStyle}
                  >
                    {item.title}
                  </Text>
              </View>
            </View>
            <View style={style.borderStyle}/>
          </Swipeable>
        ))}
      </View>
    );
  }
}

export default SwipeList;