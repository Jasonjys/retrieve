import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { styles, constants } from '../styles';
import { itemsRef } from '../firebaseConfig'

class ActionButton extends Component {

  handlePress = () => {
    itemsRef.push({title: '0'})
  }

  render() {
    return (
      <View style={styles.action}>
        <TouchableHighlight
          underlayColor={constants.actionColor}
          onPress={this.handlePress}>
          <Text style={styles.actionText}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default ActionButton;
