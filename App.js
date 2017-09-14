import React, {Component}from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import StatusBar from './components/StatusBar';
import ActionButton from './components/ActionButton';
import ListItem from './components/ListItem';
import { styles } from './styles';
import { itemsRef } from './firebaseConfig'

export default class App extends Component {
  state = {
    dataSource: []
  }

  componentDidMount = () => {
    this.getItems(itemsRef);
  }
  
  getItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          key: child.key
        });
      })

      this.setState({
        dataSource: items
      })
    })
  }

  renderItem = ({item}) => {
    return (
      <ListItem item={item} onPress={() => {console.log('item pressed')}} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="List" />
        <FlatList data={this.state.dataSource} renderItem={this.renderItem} style={styles.listview} />
        <ActionButton title="Add" onPress={() => {console.log('onpress button')}} />
      </View>
    );
  }
}
