import {StackNavigator} from 'react-navigation';
import LoginScreen from './components/LoginScreen/LoginScreen';
import SignupScreen from './components/SignupScreen/SignupScreen';
import ProtectedScreen from './components/ProtectedScreen/ProtectedScreen';

export default StackNavigator({
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen},
  Protected: { screen: ProtectedScreen }
});
