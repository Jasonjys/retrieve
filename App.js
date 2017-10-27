import {StackNavigator, TabNavigator} from 'react-navigation';
import LoginScreen from './components/LoginScreen/LoginScreen';
import SignupScreen from './components/SignupScreen/SignupScreen';
import ProfileScreen from './components/ProfileScreen/ProfileScreen';
import FoundPostsScreen from './components/FoundPostsScreen/FoundPostsScreen';
import LostPostsScreen from './components/LostPostsScreen/LostPostsScreen';
import PostFormScreen from './components/PostForm/PostForm';
import MapScreen from './components/Map/Map';
import DetailsScreen from './components/DetailPage/DetailPage';
import SearchScreen from './components/SearchScreen/SearchScreen';
import EditProfileScreen from './components/EditProfile/EditProfile';

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
  lazyLoad: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63'
  }
});

export default StackNavigator({
  Login: {screen: LoginScreen},
  Signup: {screen: SignupScreen},
  Tabs: {screen: Tabs},
  PostForm: {screen: PostFormScreen},
  Map: {screen: MapScreen},
  Search: {screen: SearchScreen},
  Details: {screen: DetailsScreen},
  EditProfile: {screen: EditProfileScreen}
});