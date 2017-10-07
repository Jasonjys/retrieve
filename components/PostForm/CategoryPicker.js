import React, {Component} from 'react';
import {View} from 'react-native'
import { Picker, List as AntList } from 'antd-mobile';

class CategoryPicker extends Component {
  state = {
    value: this.props.categoryValue
  }
  generateData = () => {
    const data = [
      {
        label: 'Eletronic',
        value: 'eletronic'
      },
      {
        label: 'Clothing/Shoes',
        value: 'clothingShoes'
      },
      {
        label: 'School/Office Supply',
        value: 'supply'
      },
      {
        label: 'Jewelry & Watch',
        value: 'jewelry'
      },
      {
        label: 'Wallet/Card/Key',
        value: 'wck'
      },
      {
        label: 'Bag',
        value: 'bag'
      },
      {
        label: 'Other',
        value: 'other'
      }
    ]
    return data
  }
  render() {
    return (
        <Picker
          data={this.generateData()}
          cols={1}
          onChange={(v)=>{this.props.handleOnChange(v)}}
          value={this.props.categoryValue}
          extra='Tap to choose'
          okText='Confirm'
          dismissText='Cancel'
          style={{backgroundColor: 'white'}}>
          <AntList.Item arrow="horizontal">Choose one category</AntList.Item>
        </Picker>
    )
  }
}

export default CategoryPicker;