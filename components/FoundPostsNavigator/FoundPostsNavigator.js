import { StackNavigator } from 'react-navigation';
import FoundPostsScreen from '../FoundPostsScreen/FoundPostsScreen';
import SearchScreen from '../SearchScreen/SearchScreen';

export default StackNavigator({
  FoundPosts: { screen: FoundPostsScreen },
  Search: { screen: SearchScreen }
}, {
  headerMode: 'none',
  initialRouteName: 'FoundPosts'
});
