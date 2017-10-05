import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';

class BottomItemDetail extends Component {
    setNativeProps = (nativeProps) => {
        this._root.setNativeProps(nativeProps);
        }

  render() {
    return (
        <View style={{alignItems: 'center', paddingBottom: 10, flexDirection: 'row', flex: 1}}>
            <Image source={{uri: this.props.img}}
            style={{height: 50, width: 50,borderRadius:25, margin:10}}/>
            <View style={{width: '70%',flexWrap: 'wrap'}}>
                <Text numberOfLines={2}
                    style={{fontWeight: '900', fontSize: 18, marginTop: '5%',textAlign: 'center',flexWrap: 'wrap'}} >
                    {this.props.title}
                </Text>
            </View>
        </View>
    );
  }
}
export default BottomItemDetail
