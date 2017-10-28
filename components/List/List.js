import React, {Component} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {List, ListItem, Icon} from 'react-native-elements'
import style from './Style';
import moment from 'moment';
import matchCategory from '../../library/matchCategory';

class ListComponent extends Component {
  handleLongPress = (key) => {
    if(this.props.handleLongPress){
      this.props.handleLongPress(key)
    }
  }
 
  render() {
    return (
      <ScrollView>
        <List containerStyle={style.listContainer}>
          {
            this.props.list.map((item, key) => (
              <ListItem
                underlayColor='#e5e5e5'
                key={key}
                title={item.title}
                titleNumberOfLines={2}
                titleStyle={style.itemTitle}
                onPress={() => this.props.navigate('Details', item)}
                onLongPress={() => this.handleLongPress(key)}
                subtitle={
                  <View style={style.itemContainer}>
                    {item.img ? <Image source={{uri: item.img}} style={style.imageStyle}/> 
                    : <Image source={require('../../assets/images/noImage.jpg')} style={style.imageStyle}/>}
                    <View style={style.itemContentContainer}>
                      <Text style={{color: 'grey'}}> 
                        <Icon
                          name='label'
                          style={style.iconStyle}
                          size={18}
                          color='grey'
                        />
                        {matchCategory(item.category)}
                      </Text>
                      {item.date ?
                        <Text style={{marginTop: 10, color: 'grey'}}>
                          <Icon
                            name='query-builder'
                            style={style.iconStyle}
                            size={18}
                            color='grey'
                          />
                          {item.date}
                        </Text> : null
                      }
                      {item.location && item.location.address ?
                        <Text style={{marginTop: 10, color: 'grey'}}>
                          <Icon
                            name='room'
                            style={style.iconStyle}
                            size={18}
                            color='grey'
                          />
                          {item.location.address}
                        </Text> : null
                      }
                      <View style={style.timeTextContainer}>
                        <Text style={{color: 'grey'}}>
                          {moment(item.postDate).fromNow()}
                        </Text>
                      </View>
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