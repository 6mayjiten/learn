import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AuthLoadingScreen from './Auth';
import Login from './Auth/login';
import Home from './Home';
import Courses from './Courses/Courses';
import SpellingCourse from './Courses/SpellingCourse';
import Registeration from './Auth/registration';

const AuthStack = createStackNavigator(
  {
    Login: {screen: Login},
    Register: {screen: Registeration},
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
    },
    animationEnabled: true,
    lazy: false,
  },
);

const AppStack = createStackNavigator(
  {
    Home: {screen: Home},
    Courses: {
      screen: Courses,
    },
    SpellingCourse: {screen: SpellingCourse},
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
    },
    animationEnabled: true,
    lazy: false,
  },
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
      defaultNavigationOptions: {
        headerTitleAlign: 'center',
      },
    },
  ),
);

export default AppContainer;
