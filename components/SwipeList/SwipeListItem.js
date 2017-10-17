import React, {Component} from 'react';
import {View, Button, Text, Image, TouchableHighlight} from 'react-native';
import { Icon } from 'react-native-elements'
import Swipeable from 'react-native-swipeable';
import style from './Style'

class SwipeListItem extends Component {

//   setNativeProps = (nativeProps) => {
//     this._root.setNativeProps(nativeProps);
//   }
swipeable = null

recenter() {
  if (this.swipeable) {
    this.swipeable.recenter();
  }
}


  render() {
    const {onOpen, onClose} = this.props;
    return (
      <Swipeable 
        rightButtons={[
          <TouchableHighlight 
            underlayColor='#95c2e2'
            style={style.editButtonContainerStyle} onPress={() => {
            this.props.onEdit(this.props.item)
            this.props.onRecenter()
          }}>
            <View style={style.buttonContainerViewStyle}>
                <Icon name='create'color="white" size={33}/>
            </View>
          </TouchableHighlight>,
          <TouchableHighlight
              underlayColor='#ff9eaf'
              style={style.deleteButtonContainerStyle}
              onPress={() => {
              this.props.onDelete(this.props.item.id, this.props.id)
              this.props.onRecenter()
              }}>
              <View style={style.buttonContainerViewStyle}>
              <Icon color="white" name='delete' size={33}/>
              </View>
          </TouchableHighlight>
        ]}
        onRef={ref => this.swipeable = ref}
        onRightButtonsOpenRelease={() => onOpen(this)}
        onRightButtonsCloseRelease={() => onClose(this)}
      >
        <TouchableHighlight onPress={()=>{this.props.onPress()}} underlayColor='#e5e5e5'>
          <View style={style.listItemStyle}>
            {this.props.item.img ? 
              <Image
                source={{uri: this.props.item.img}}
                style={style.imageStyle}
              /> 
              :
              <Image 
                source={require('../../assets/images/noImage.jpg')}
                style={style.imageStyle}
              />
            }
            <View style={style.textContainerStyle}>
                <Text numberOfLines={2} style={style.textStyle}>
                  {this.props.item.title}
                </Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={style.borderStyle}/>
      </Swipeable>
    );
  }
}

export default SwipeListItem;