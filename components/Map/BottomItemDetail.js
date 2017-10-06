import React, {Component} from 'react';
import {Text, View, TouchableHighlight, Image} from 'react-native';

class BottomItemDetail extends Component {
  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <TouchableHighlight
        style={{
          flex: 1,
          backgroundColor: 'white',
          height: '40%',
          alignItems: 'center',
          paddingHorizontal: 10
        }}
        onPress={()=>{
            this.props.navigate('Details', this.props.detail)
        }}
        underlayColor='#d6d7d8'
      >
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <Image 
            source={{uri: this.props.detail.img}}
            style={{height: 50, width: 50, borderRadius:25}}
          />
          <View style={{width: '70%',flexWrap: 'wrap', paddingBottom: '4%'}}>
              <Text 
                numberOfLines={2}
                style={{fontWeight: '900', fontSize: 18, marginTop: '5%',textAlign: 'center',flexWrap: 'wrap'}}
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
