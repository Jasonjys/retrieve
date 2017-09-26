import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { List, ListItem } from 'react-native-elements'

class ListComponent extends Component {
  render() {
    const list = [
      {
        title: 'Found black Nike bag on Bank street',
        description: 'I found a black Nike bag on Bank street, there are some stuff inside, please contact me for more imformation.'
      },
      {
        title: 'Found red shoes at Billings',
        description: 'I found red shoes at Billings, there are some stuff inside, please contact me for more imformation.'
      }
    ]
    return (
      <View>
        <List containerStyle={{marginBottom: 20}}>
          {
            list.map((l, i) => (
              <ListItem
                roundAvatar
                key={i}
                title={l.title}
                subtitle={
                <View style={{flexDirection: 'row',
                      paddingLeft: 10,
                      paddingTop: 5}}>
                  <Text style={{paddingLeft: 10,
                        color: 'grey'}}>{l.description}</Text>
                </View>
              }
              />
            ))
          }
        </List>
      </View>
    );
  }
}

export default ListComponent;