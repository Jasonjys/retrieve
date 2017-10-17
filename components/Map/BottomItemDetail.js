import React, {Component} from 'react';
import {Text, View, TouchableHighlight, Image} from 'react-native';
import style from './BottomItemStyle'
class BottomItemDetail extends Component {
  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <TouchableHighlight
        style={style.touchableHightLightStyle}
        onPress={()=>{
            this.props.navigate('Details', this.props.detail)
        }}
        underlayColor='#d6d7d8'
      >
        <View style={style.containerStyle}>
          <Image 
            source={{uri: this.props.detail.img}}
            style={{height: 50, width: 50, borderRadius:25}}
          />
          <View style={style.imageStyle}>
              <Text 
                numberOfLines={2}
                style={style.textStyle}
              >
                {this.props.detail.title}
              </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
export default BottomItemDetail
