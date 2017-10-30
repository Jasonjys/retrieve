import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  touchableHeighlightStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140
  },
  iconStyle: {
    height: '100%', width: '100%',
    borderRadius: 100,
    borderColor: 'rgba(0,0,0, 0.4)',
    borderWidth: 6
  },
  scrollViewStyle: {
    flex:1,
    backgroundColor: 'white'
  },
  centerImageStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveButtonStyle: {
    backgroundColor: '#ff9eaf',
    margin: 10,
    shadowColor: '#000000',
    borderRadius:10
  }
});