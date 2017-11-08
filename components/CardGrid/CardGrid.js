import React, {Component} from 'react';
import {Text, View, Image, ScrollView, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements'
import moment from 'moment';
import matchCategory from '../../library/matchCategory';

class CardGrid extends Component {

  render() {
    return (
      <ScrollView style={{flex: 1}}>
          <View style={{height: '100%', flexDirection: 'row', flexWrap: 'wrap', marginTop: '3%', marginLeft: '2%'}}>
            {this.props.list.map((item, key)=>(
              <TouchableHighlight
                key={key}
                style={{width: '48%', marginHorizontal:2, borderColor: 'black'}}
                onPress={()=>this.props.navigate('Details', item)}
                underlayColor='rgba(0,0,0,0.2)'>
                <View>
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                      source={item.img ? {uri: item.img} : require('../../assets/images/noImage.jpg')}
                      style={{height: 240,
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        borderWidth: 1,
                        borderRadius: 7,
                        borderColor: '#828282'
                      }}
                    >
                    <View style={{width: '100%',height: 90, backgroundColor: 'rgba(0,0,0,0.3)',alignContent: 'flex-start', justifyContent: 'center'}}>
                      <Text style={{color: 'white', fontSize: 13}}> 
                          <Icon
                            name='label'
                            style={{
                              height: 10,
                              width:23,
                              marginTop: -4
                            }}
                            size={16}
                            color='white'
                          />
                          {matchCategory(item.category)}
                        </Text>
                        {item.location && item.location.address ?
                          <Text style={{marginTop: 10, color: 'white'}} numberOfLines={2}>
                            <Icon
                              name='room'
                              style={{
                                height: 10,
                                width:23,
                                marginTop: -4
                              }}
                              size={18}
                              color='white'
                            />
                            {item.location.address}
                          </Text> : null
                        }
                      </View>
                    </Image>
                  </View>
                  <View style={{width: '100%', height: 80, alignItems: 'center', justifyContent: 'center', marginBottom: 5}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 19,
                        textAlign: 'center',fontFamily: 'Avenir Next'
                      }}
                      numberOfLines={2}
                    >
                      {item.title}
                    </Text>
                    <View>
                      <Text style={{color: 'grey'}}>
                        {moment(item.postDate).fromNow()}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            ))}
          </View>
      </ScrollView>
    );
  }
}

export default CardGrid;