import React, {Component} from 'react';
import {View} from 'react-native'
import style from './Style';
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

class Tag extends Component {
  render() {
    const {tags, tagInput, errorMessage, onTagSubmit, onChangeText} = this.props
    return (
      <View>
        <FormLabel>Tags</FormLabel>
        <FormInput
          containerStyle={{marginBottom: 5}}
          onChangeText={value => onChangeText(value)}
          blurOnSubmit={true}
          placeholder='Enter tags here...'
          containerStyle={{borderBottomWidth: 2}}
          onSubmitEditing={() => onTagSubmit(tagInput, errorMessage)}
          clearButtonMode={"while-editing"}
          value={tagInput}>
        </FormInput>
        {!errorMessage ? null : 
        <FormValidationMessage>
        {errorMessage}
        </FormValidationMessage>}
        {tags}
      </View>
    )
  }
}

export default Tag;