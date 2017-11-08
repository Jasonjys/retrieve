import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%'
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: '800',
    textAlign: 'center'
  },
  image: {
    height: '35%',
    width: '80%',
    marginTop: 10
  },
  contentContainer: {
    alignItems: 'center',
    height: '65%',
    width: '100%'
  },
  desStyle: {
    fontSize: 15,
    color: '#5e5f60',
    marginTop: 30
  },
  infoLabelStyle: {
    fontSize: 13,
    marginBottom: -10
  },
  posterContainerStyle: {
    marginLeft: '5%',
    marginTop: '2%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  posterImage: {
    height: 60,
    width: 60,
    borderRadius: 30
  },
  posterName: {
    marginLeft: '2%',
    marginTop: '15%',
    fontSize: 16,
    fontWeight: 'bold'
  },
  posterEmail: {
    marginLeft: '5%',
    fontSize: 12,
    color: '#919191'
  }
});