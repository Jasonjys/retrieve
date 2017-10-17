import {StackNavigator, TabNavigator} from 'react-navigation';
import LoginScreen from './components/LoginScreen/LoginScreen';
import SignupScreen from './components/SignupScreen/SignupScreen';
import ProfileScreen from './components/ProfileScreen/ProfileScreen';
import FoundPostsScreen from './components/FoundPostsScreen/FoundPostsScreen';
import LostPostsScreen from './components/LostPostsScreen/LostPostsScreen';
import CreatePostScreen from './components/PostForm/PostForm';
import SearchScreen from './components/SearchScreen/SearchScreen';
import MapScreen from './components/Map/Map';
import DetailsScreen from './components/DetailPage/DetailPage';
import TemSearchSreen from './components/Map/TemSearch'

const Tabs = TabNavigator({
  Profile: {
    screen: ProfileScreen
  },
  FoundPosts: {
    screen: FoundPostsScreen
  },
  LostPosts: {
    screen: LostPostsScreen
  }
}, {
  initialRouteName: 'FoundPosts',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63'
  }
});

export default StackNavigator({
  Login: {screen: LoginScreen},
  Signup: {screen: SignupScreen},
  Tabs: {screen: Tabs},
  CreatePost: {screen: CreatePostScreen},
  Map: {screen: MapScreen},
  Search: {screen: SearchScreen},
  Details: {screen: DetailsScreen},
  TemSearch: {screen: TemSearchSreen}
});