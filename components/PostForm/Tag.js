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

{/* <Tag 
onChangeText={(value) => this.setState({tagInput: value})}
onTagSubmit={this.handleTagSubmit}
tagInput={this.state.tagInput}
errorMessage={this.state.errorMessage}
tags={tags}
/> */}

// checkDuplicateTag = (tagName) => {
//   return this.state.tagArray.find((tag) => {
//     return tagName.toLowerCase() === tag.toLowerCase()
//   })
// }

// handleTagSubmit = (tagInput, errorMessage) => {
//   if(this.checkDuplicateTag(tagInput)) {
//     this.setState({errorMessage: 'Tag already exist!'})
//   } else if (!isNaN(tagInput)) {
//     this.setState({errorMessage: 'Invalid Tag!'})
//   } else {
//     this.setState({errorMessage: ''})
//     this.state.tagArray.push(tagInput)
//     this.setState({tagInput: ''})
//   }
// }
// handleGenerateTags = () => {
//   return (
//     <View style={{flexDirection: 'row', flexWrap:'wrap'}}>
//       {this.state.tagArray.map((tag, key) => (
//         <Badge key={key} containerStyle={{ backgroundColor: 'violet', height: 40, margin: 10}}
//           onPress={() => {
//             let arr = this.state.tagArray.filter((tag, index) => {
//               return index !== key
//             })
//             this.setState({tagArray: arr})
//           }}
//           value={tag}>
//         </Badge>
//       ))}
//     </View>
//   );
// }

// let tags = this.handleGenerateTags()