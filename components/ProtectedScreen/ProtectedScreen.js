import {TabNavigator, Image} from 'react-navigation';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import FoundPostsNavigator from '../FoundPostsNavigator/FoundPostsNavigator';
import LostPostsNavigator from '../LostPostsNavigator/LostPostsNavigator';

export default TabNavigator({
  Profile: {
    screen: ProfileScreen
  },
  FoundPostsNavigator: {
    screen: FoundPostsNavigator
  },
  LostPostsNavigator: {
    screen: LostPostsNavigator
  }
}, {
  initialRouteName: 'FoundPostsNavigator',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63'
  },
});