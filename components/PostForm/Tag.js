import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, ScrollView} from 'react-native'
import { styles } from './styles';
import { FormLabel, FormInput, Badge, Button, Header, FormValidationMessage } from 'react-native-elements'

class Tag extends Component {
  render() {
    return (
      <View>
        <FormLabel>Tags</FormLabel>
        <FormInput
          containerStyle={{marginBottom: 5}}
          onChangeText={value => this.props.onChangeText(value)}
          blurOnSubmit={true}
          placeholder='Enter tags here...'
          containerStyle={{borderBottomWidth: 2}}
          onSubmitEditing={() => this.props.onTagSubmit(this.props.tagInput, this.props.errorMessage)}
          clearButtonMode={"while-editing"}
          value={this.props.tagInput}>
        </FormInput>
        {!this.props.errorMessage ? null : 
        <FormValidationMessage>
        {this.props.errorMessage}
        </FormValidationMessage>}
        {this.props.tags}
      </View>
    )
  }
}

export default Tag;