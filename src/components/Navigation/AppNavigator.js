import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Dimensions} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import AuthLoadingScreen from '../Auth';
import Login from '../Auth/login';
import Home from '../Home';
import Courses from '../Courses/Courses';
import SpellingCourse from '../Courses/SpellingCourse';
import Registration from '../Auth/registration';
import Sidebar from '../Header/Sidebar';
import MathCourse from '../Courses/MathCourse';
import CourseByYear from '../Courses/CourseByYear';

const navOptionHandler = (navigation) => ({
  headerShown: false
})

const AuthStack = createStackNavigator(
  {
    Login: {screen: Login},
    Register: {screen: Registration},
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
    },
    animationEnabled: true,
    lazy: false,
  },
);

const MainDrawer = createDrawerNavigator({
    Home: { screen: Home },
    Courses: { screen: Courses }
  },
  {
    contentComponent: Sidebar,
    drawerPosition: "right",
    drawerWidth: Dimensions.get('window').width * 3/4,
    navigationOptions: navOptionHandler,
    edgeWidth : 100
  }
);

const AppStack = createStackNavigator(
  {
    Home:{ screen : MainDrawer },
    Courses: {
      screen: Courses,
    },
    SpellingCourse: {screen: SpellingCourse, navigationOptions: { title: 'English', headerTitleAlign: 'center' }},
    CourseByYear: {screen: CourseByYear, navigationOptions: { title: 'Select Course Year', headerTitleAlign: 'center' }},
    MathCourse: {screen: MathCourse, navigationOptions: { title: 'Maths', headerTitleAlign: 'center'}}
  },
  {
    animationEnabled: true,
    lazy: false,
  },
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'AuthLoading'
    },
  ),
);

export default AppContainer;
