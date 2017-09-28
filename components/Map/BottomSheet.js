import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements'
import ListComponent from '../List/ListComponent'

class BottomSheet extends Component {

    state = {
        showList: false
    }

    onHandlePress = () => {
        this.setState({showList: true})
        
    }

  render() {
    return (
      <View style={{flex: 1}}>
        {/* <Button
            title='Show List'
            containerViewStyle={{width: 400}}
            textStyle={{color: 'grey'}}
            backgroundColor='white'
            onPress={this.onHandlePress}/> */}
        <ListComponent style={{height: '100%', width: '100%'}}/>
      </View>
    );
  }
}

export default BottomSheet;
