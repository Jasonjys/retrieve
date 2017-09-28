import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { FormLabel, Badge, Button} from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class DetailPage extends Component {
  handleGenerateTags = (tagArray) => {
    return (
      <View style={{flexDirection: 'row', flexWrap:'wrap'}}>
        {tagArray.map((tag, key) => (
              <Badge key={key} containerStyle={{ backgroundColor: 'violet', height: 40, margin: 10}} value={tag}>
              </Badge>
        ))}
      </View>
    );
}
  render() {
     let data ={
         title: 'Found: Black Nike Backpack on Bank Steet',
         description: 'I found a black Nike Backpack on Bank street yesterday, near the Marble Slab Creamery store, there are bunch of stuffs inside, please contact me for more details',
         tagArray: ['Backpack','Black','Nike'],
         location: {
          "description": "1755 Riverside Drive, Ottawa, ON, Canada",
          "id": "142b30360918b413f736398b6ea3ac347d602f70",
          "matched_substrings":[{
              "length": 17,
              "offset": 0,
            },
          ],
          "place_id": "EigxNzU1IFJpdmVyc2lkZSBEcml2ZSwgT3R0YXdhLCBPTiwgQ2FuYWRh",
          "reference": "CjQsAAAAOHNLbH-eoG49QOpkCDgQfqkJ2bvZsxHw2Za-eqXtIvB-21M2rP9uIZ6kA5ev8niXEhC551B-5QgrJqu16JjHGdDQGhTb8GE70_n2K4SoPmQIb1ScgiN-Hw",
          "structured_formatting": {
            "main_text": "1755 Riverside Drive",
            "main_text_matched_substrings": [{
                "length": 17,
                "offset": 0,
              },
            ],
            "secondary_text": "Ottawa, ON, Canada",
          },
          "terms": [{
              "offset": 0,
              "value": "1755 Riverside Drive",
            },{
              "offset": 22,
              "value": "Ottawa",
            },{
              "offset": 30,
              "value": "ON",
            },{
              "offset": 34,
              "value": "Canada",
            },
          ],
          "types":[
            "route",
            "geocode",
          ],
        },
         date: '2017-09-21',
         img: 'https://i.pinimg.com/736x/8d/7b/e2/8d7be2ebaf5c9b6a35cdbb78c07858b5--nike-backpacks-school-backpacks.jpg'
     }
     let tags = this.handleGenerateTags(data.tagArray)
    return (
      <ScrollView contentContainerStyle={{alignItems: 'center', backgroundColor: 'white'}}>
        <Image source={{url: data.img}} style={{ height: 300, width: 300 }}/>
        <View style={{alignItems: 'center'}}>
          <FormLabel labelStyle={{fontSize: 30, color: 'black', fontWeight: '800', textAlign: 'center'}}> {data.title} </FormLabel>
          {tags}
          <FormLabel> {data.description} </FormLabel>
          <FormLabel> Date: {data.date} </FormLabel>
        </View>
          <FormLabel labelStyle={{textAlign: 'center'}}> Location: {data.location.structured_formatting.main_text} {data.location.structured_formatting.secondary_text}</FormLabel>
      </ScrollView>
    );
  }
}

export default DetailPage;