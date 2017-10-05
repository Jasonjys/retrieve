import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { List, ListItem, Icon} from 'react-native-elements'

class ListComponent extends Component {
  render() {
    const list = [
      {
        title: 'Found black Nike bag at 1755 riverside dr',
        description: 'I found a black Nike bag on Bank street, there are some stuff inside, please contact me for more imformation.I found a black Nike bag on Bank street, there are some stuff inside, please contact me for more imformation.I found a black Nike bag on Bank street, there are some stuff inside, please contact me for more imformation.I found a black Nike bag on Bank street, there are some stuff inside, please contact me for more imformation.I found a black Nike bag on Bank street, there are some stuff inside, please contact me for more imformation.',
        img: 'http://media3.newlookassets.com/i/newlook/538303001.jpg',
        date: '2017-09-18',
        location: {
          address: '1755 Riverside Drive, Ottawa, Canada',
          geometry: {
            lat: 45.4019377,
            lng: -75.6652049
          }
        }
      },
      {
        title: 'Found red shoes at Carleton',
        description: 'I found red shoes at Billings, please contact me for more imformation.',
        img: 'https://previews.123rf.com/images/pretoperola/pretoperola1201/pretoperola120100029/11936982-vintage-red-shoes-on-white-background-Stock-Photo-shoes-tennis.jpg',
        date: '2017-09-15',
        location: {
          address: 'Carleton University, Ottawa, ON, Canada',
          geometry: {
            lat: 45.3875812,
            lng: -75.69602019999999
          }
        }
      },
      {
        title: 'Found Macbook pro at TD place',
        description: 'I found a Macbook pro at Rideau, please contact me for more imformation.',
        img: 'https://cnet4.cbsistatic.com/img/zRSypNZhBIJeuedE2_1iMDb0dYc=/770x433/2016/10/27/8facf3fa-d4e1-4221-bdcf-053ad6ce8c2f/apple-macbook-pro-13-inch-2016-1684-017.jpg',
        date: '2017-09-17',
        location: {
          address: 'TD place, Bank street, Ottawa, ON, Canada',
          geometry: {
            lat: 45.3982089,
            lng: -75.6834678
          }
        }
      },
      {
        title: 'Found keys at Billings bridge',
        description: 'I found keys at Rideau, please contact me for more imformation.',
        img: 'https://proudamericans.org/wp-content/uploads/Keys.jpg',
        date: '2017-09-19',
        location: {
          address: 'Billings bridge, Ottawa, ON, Canada',
          geometry: { 
            lat: 45.3859731,
            lng: -75.6779533
          }
        }
      }
    ]
    return (
      <ScrollView>
        <List containerStyle={{marginTop: 0}}>
          {
            list.map((list, key) => (
              <ListItem
                key={key}
                title={list.title}
                titleNumberOfLines={2}
                titleStyle={{fontWeight: '900', fontSize: 18}}
                onPress={() => {this.props.navigate('Details', list)}}
                subtitle={
                  <View 
                    style={{flexDirection: 'row',
                    paddingLeft: 10,
                    paddingTop: 5,
                    paddingBottom: 10}}>
                    <Image source={{uri: list.img}} style={{height: 130, width: 100}}/>
                    <View style={{flexDirection: 'column', paddingLeft: 15}}>
                      <Text style={{marginTop: 10, color: 'grey'}}>
                        <Icon
                          name='query-builder'
                          style={{height: 10, width: 23, marginTop: -3}}
                          size={18} color='grey'
                        />
                        {list.date} 
                      </Text>
                      <Text style={{marginTop: 10, color: 'grey', width: 230}}>
                        <Icon
                          name='room'
                          style={{height: 10, width:23, marginTop: -3}}
                          size={18}
                          color='grey'
                        />
                        {list.location.address}
                      </Text>
                    </View>
                  </View>
                }
              />
            ))
          }
        </List>
      </ScrollView>
    );
  }
}

export default ListComponent;