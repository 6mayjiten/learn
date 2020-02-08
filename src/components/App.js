import React from 'react';
import AppContainer from './AppNavigator';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import NavigationService from './NavigationService';
import DropdownAlert from 'react-native-dropdownalert';
import {MessageHelper} from '../Helper/messageHelper';
import {StatusBar} from 'react-native';

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        <DropdownAlert
          defaultContainer={{
            padding: 8,
            paddingTop: StatusBar.currentHeight,
            flexDirection: 'row',
          }}
          ref={ref => MessageHelper.setDropDown(ref)}
          onClose={() => MessageHelper.invokeOnClose()}
          onCancel={() => MessageHelper.invokeOnClose()}
        />
      </Provider>
    );
  }
}
