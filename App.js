import {StackNavigator, TabNavigator} from 'react-navigation';
import LoginScreen from './components/LoginScreen/LoginScreen';
import SignupScreen from './components/SignupScreen/SignupScreen';
import ProfileScreen from './components/ProfileScreen/ProfileScreen';
import FoundPostsScreen from './components/FoundPostsSceen/FoundPostsScreen';
import LostPostsScreen from './components/LostPostsScreen/LostPostsScreen';
import CreateFoundPostScreen from './components/PostForm/PostForm';
import ListComponent from './components/List/ListComponent'
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
  CreateFoundPost: {screen: CreateFoundPostScreen},
  // List: {screen: ListComponent}
});