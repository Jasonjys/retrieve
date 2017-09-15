import React, {Component}from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { styles } from './styles';
import PostForm from './components/PostForm/PostForm'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar title="List" />
        <FlatList data={this.state.dataSource} renderItem={this.renderItem} style={styles.listview} />
        <ActionButton title="Add"/> */}
        <PostForm />
      </View>
    );
  }
}
