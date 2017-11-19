import React, {Component} from 'react';
import {View} from 'react-native';
import style from './Style'
import SwipeListItem from './SwipeListItem'

class SwipeList extends Component {
  state = {
    currentlyOpenItem: null
  };

  closeOpenItem = () => {
    const {currentlyOpenItem} = this.state;

    if (currentlyOpenItem) {
      currentlyOpenItem.recenter();
    }
  };

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    const {currentlyOpenItem} = this.state;
    return (
      <View>
        {this.props.list.map((item, key) => (
          <SwipeListItem
            key={key}
            index={key}
            item={item}
            displayFound={this.props.displayFound}
            onEdit={this.props.onEdit}
            onDelete={this.props.onDelete}
            onRecenter={() => currentlyOpenItem.recenter()}
            onPress={() => this.props.navigate('Details', item)}
            onOpen={listItem => {
              if (currentlyOpenItem && currentlyOpenItem !== listItem) {
                currentlyOpenItem.recenter();
              }
              this.setState({currentlyOpenItem: listItem});
            }}
            onClose={() => this.setState({currentlyOpenItem: null})}
          />
        ))}
      </View>
    );
  }
}

export default SwipeList;