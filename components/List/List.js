import React, {Component} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {List, ListItem, Icon} from 'react-native-elements'
import {fakeList} from './mockList'
import style from './Style';

class ListComponent extends Component {
  handleLongPress = (key) => {
      if(this.props.handleLongPress){
        this.props.handleLongPress(key)
      }
  }
  generateCategory = (category) => {
    switch (category){
      case 'eletronic':
        return 'Eletronic'
        break;
      case 'clothingShoes':
        return 'Clothing/Shoes'
        break;
      case 'supply':
        return 'School/Office Supply'
        break;
      case 'jewelry':
        return 'Jewelry & Watch';
        break;
      case 'wck':
        return 'Wallet/Card/Key'
        break;
      case 'pet':
        return 'Pet'
        break;
      case 'bag':
        return 'Bag'
        break;
      case 'other':
        return 'Other'
        break;
    }
  }
  render() {
    return (
      <ScrollView>
        <List containerStyle={style.listContainer}>
          {
            this.props.list.map((item, key) => (
              <ListItem
                key={key}
                title={item.title}
                titleNumberOfLines={2}
                titleStyle={style.itemTitle}
                onPress={() => this.props.navigate('Details', item)}
                onLongPress={() => this.handleLongPress(key)}
                subtitle={
                  <View style={style.itemContainer}>
                    {item.img ? <Image source={{uri: item.img}} style={{height: 100, width: 100}}/> 
                    : <Image source={require('../../assets/images/noImage.jpg')} style={{height: 100, width: 100}}/>}
                    <View style={{flexDirection: 'column', paddingLeft: 15}}>
                      <Text style={{marginTop: 10, color: 'grey'}}> 
                        <Icon
                            name='label'
                            style={{height: 10, width: 23, marginTop: -4}}
                            size={18}
                            color='grey'
                        />
                        {this.generateCategory(item.categoryValue)}
                      </Text>
                      <Text style={{marginTop: 10, color: 'grey'}}>
                        <Icon
                          name='query-builder'
                          style={{height: 10, width: 23, marginTop: -3}}
                          size={18}
                          color='grey'
                        />
                        {item.foundDate}
                      </Text>
                      {item.location.address ? 
                        <Text style={{marginTop: 10, color: 'grey', width: 230}}>
                          <Icon
                            name='room'
                            style={{height: 10, width:23, marginTop: -3}}
                            size={18}
                            color='grey'
                          />
                          {item.location.address}
                        </Text>: null
                      }
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