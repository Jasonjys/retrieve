// import React, {Component}from 'react';
// import { StyleSheet, Text, View, FlatList } from 'react-native';
// import StatusBar from './components/StatusBar';
// import ActionButton from './components/ActionButton';
// import ListItem from './components/ListItem';
// import { styles } from './styles';
// import { itemsRef } from './firebaseConfig'

// export default class App extends Component {
//   state = {
//     dataSource: []
//   }

//   componentDidMount = () => {
//     this.getItems(itemsRef);
//   }
  
//   getItems = (itemsRef) => {
//     itemsRef.on('value', (snap) => {
//       let items = [];
//       snap.forEach((child) => {
//         items.push({
//           title: child.val().title,
//           key: child.key
//         });
//       })

//       this.setState({
//         dataSource: items
//       })
//     })
//   }

//   renderItem = ({item}) => {
//     return (
//       <ListItem item={item} onPress={() => {console.log('item pressed')}} />
//     );
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <StatusBar title="List" />
//         <FlatList data={this.state.dataSource} renderItem={this.renderItem} style={styles.listview} />
//         <ActionButton title="Add" onPress={() => {console.log('onpress button')}} />
//       </View>
//     );
//   }
// }

import React, { Component } from 'react';
import { Container, Content,Header, Item, Input, Icon, Button, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
export default class LayoutExample extends Component {
  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flexGrow: 1}}>
          <Grid>
            <Row style={{ backgroundColor: '#635DB7', margin: 20}}>
              <Content>
                <Item>
                  <Icon name="ios-search" />
                  <Input placeholder="Search" />
                  <Icon name="ios-navigate" />
                  <Button transparent>
                    <Text>Search</Text>
                  </Button>
                </Item>
              </Content>
            </Row>
            <Row style={{ backgroundColor: '#00CE9F', margin: 20}}>

            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}