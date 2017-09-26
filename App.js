import {StackNavigator} from 'react-navigation';
import LoginScreen from './components/LoginScreen/LoginScreen';
import SignupScreen from './components/SignupScreen/SignupScreen';
import ProtectedScreen from './components/ProtectedScreen/ProtectedScreen';
import separateNavigator from './library/separateNavigator'

export default StackNavigator({
  Login: { screen: separateNavigator(LoginScreen) },
  Signup: { screen: separateNavigator(SignupScreen) },
  Protected: { screen: separateNavigator(ProtectedScreen) }
}, {
  headerMode: 'screen',
});