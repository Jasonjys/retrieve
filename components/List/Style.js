import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  listContainer: {
    marginTop: 0,
    borderTopColor: 'transparent',
    width: '100%'
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 10,
    paddingTop: 5
  },
  itemTitle: {
    fontWeight: '700',
    fontSize: 16
  },
  itemContentContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 15,
    width: '85%',
    height: 90
  },
  imageStyle: {
    height: '100%',
    width: '30%'
  },
  iconStyle: {
    height: 10,
    width:23,
    marginTop: -4
  },
  timeTextContainer: {
    paddingTop: 5,
    alignItems: 'flex-end'
  }
});