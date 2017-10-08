import React, {Component} from 'react';
import {View, Button, Text, Image, TouchableHighlight} from 'react-native';
import Swipeable from 'react-native-swipeable';
import {firebaseApp} from '../../firebaseConfig';


class SwipeList extends Component {

  render() {
    const rightButtons = [
      <TouchableHighlight><Text>Edit</Text></TouchableHighlight>,
      <TouchableHighlight><Text>Delete</Text></TouchableHighlight>
    ];
    return (
      <View>
        {this.props.list.map((item, key) => (
          <Swipeable key={key} rightButtons={rightButtons}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
              <Image 
                source={{uri: item.img}}
                style={{height: 50, width: 50, borderRadius:25}}
              />
              <View style={{width: '70%',flexWrap: 'wrap', paddingBottom: '4%'}}>
                  <Text 
                    numberOfLines={2}
                    style={{fontWeight: '900', fontSize: 18, marginTop: '5%',textAlign: 'center',flexWrap: 'wrap'}}
                  >
                    {item.title}
                  </Text>
              </View>
            </View>
            <View style={{width: '100%', borderBottomColor: 'black', borderBottomWidth: 1}}/>
          </Swipeable>
        ))}
      </View>
    );
  }
}

export default SwipeList;