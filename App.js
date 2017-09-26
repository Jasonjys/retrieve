import {StackNavigator, TabNavigator} from 'react-navigation';
import LoginScreen from './components/LoginScreen/LoginScreen';
import SignupScreen from './components/SignupScreen/SignupScreen';
<<<<<<< HEAD
import ProtectedScreen from './components/ProtectedScreen/ProtectedScreen';
import {firebaseApp} from './firebaseConfig';
import Map from './components/Map/Map'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Retrieve',
  };

  state = {
    isLogined: false,
    loading: true
  }

  componentDidMount() {
    this.removeAuthListener = firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLogined: true,
          loading: false
        })
      } else {
        this.setState({
          isLogined: false,
          loading: false
        })
      }
    });
||||||| merged common ancestors
import ProtectedScreen from './components/ProtectedScreen/ProtectedScreen';
import {firebaseApp} from './firebaseConfig';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Retrieve',
  };

  state = {
    isLogined: false,
    loading: true
  }

  componentDidMount() {
    this.removeAuthListener = firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLogined: true,
          loading: false
        })
      } else {
        this.setState({
          isLogined: false,
          loading: false
        })
      }
    });
=======
import ProfileScreen from './components/ProfileScreen/ProfileScreen';
import FoundPostsScreen from './components/FoundPostsSceen/FoundPostsScreen';
import LostPostsScreen from './components/LostPostsScreen/LostPostsScreen';
import CreateFoundPostScreen from './components/PostForm/PostForm';

const Tabs = TabNavigator({
  Profile: {
    screen: ProfileScreen
  },
  FoundPosts: {
    screen: FoundPostsScreen
  },
  LostPosts: {
    screen: LostPostsScreen
>>>>>>> 68314f039d07524c3635ddee8dc81a63836227ee
  }
}, {
  initialRouteName: 'FoundPosts',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63'
  }
<<<<<<< HEAD

  render() {
    const {navigation} = this.props;
    const {isLogined, loading} = this.state;
    const {navigate} = navigation;
    if (loading) {
      return <Text>Loading</Text>
    }

    if (isLogined) {
      return (
        <ProtectedScreen />
      )
    } else {
      return (
        <Map />
      );
    }
  }
}
||||||| merged common ancestors

  render() {
    const {navigation} = this.props;
    const {isLogined, loading} = this.state;
    const {navigate} = navigation;

    if (loading) {
      return <Text>Loading</Text>
    }

    if (isLogined) {
      return (
        <ProtectedScreen />
      )
    } else {
      return (
        <LoginScreen navigate={navigate} />
      );
    }
  }
}
=======
});
>>>>>>> 68314f039d07524c3635ddee8dc81a63836227ee

export default StackNavigator({
  Login: {screen: LoginScreen},
  Signup: {screen: SignupScreen},
  Tabs: {screen: Tabs},
  CreateFoundPost: {screen: CreateFoundPostScreen},
});