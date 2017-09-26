import { StackNavigator } from 'react-navigation';
import LostPostsScreen from '../LostPostsScreen/LostPostsScreen';
import SearchScreen from '../SearchScreen/SearchScreen';

export default StackNavigator({
  LostPosts: { screen: LostPostsScreen },
  Search: { screen: SearchScreen }
}, {
  headerMode: 'none',
  initialRouteName: 'LostPosts'
});
