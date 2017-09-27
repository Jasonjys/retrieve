import {StackNavigator, TabNavigator} from 'react-navigation';
import LoginScreen from './components/LoginScreen/LoginScreen';
import SignupScreen from './components/SignupScreen/SignupScreen';
import ProfileScreen from './components/ProfileScreen/ProfileScreen';
import FoundPostsScreen from './components/FoundPostsSceen/FoundPostsScreen';
import LostPostsScreen from './components/LostPostsScreen/LostPostsScreen';
import CreateFoundPostScreen from './components/PostForm/PostForm';
<<<<<<< HEAD
import Map from './components/Map/Map'
||||||| merged common ancestors
=======
import ListComponent from './components/List/ListComponent';
import MapScreen from './components/Map/Map';
>>>>>>> 835c84542bec69b6e23148832893092f93118886

// const Tabs = TabNavigator({
//   Profile: {
//     screen: ProfileScreen
//   },
//   FoundPosts: {
//     screen: FoundPostsScreen
//   },
//   LostPosts: {
//     screen: LostPostsScreen
//   }
// }, {
//   initialRouteName: 'FoundPosts',
//   animationEnabled: true,
//   tabBarOptions: {
//     activeTintColor: '#e91e63'
//   }
// });

export default StackNavigator({
<<<<<<< HEAD
  Map: {screen: Map}
  // Login: {screen: LoginScreen},
  // Signup: {screen: SignupScreen},
  // Tabs: {screen: Tabs},
  // CreateFoundPost: {screen: CreateFoundPostScreen},
}, {
  headerMode: 'none'
||||||| merged common ancestors
  Login: {screen: LoginScreen},
  Signup: {screen: SignupScreen},
  Tabs: {screen: Tabs},
  CreateFoundPost: {screen: CreateFoundPostScreen},
=======
  Login: {screen: LoginScreen},
  Signup: {screen: SignupScreen},
  Tabs: {screen: Tabs},
  CreateFoundPost: {screen: CreateFoundPostScreen},
  List: {screen: ListComponent},
  Map: {screen: MapScreen}
>>>>>>> 835c84542bec69b6e23148832893092f93118886
});