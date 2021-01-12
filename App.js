/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Routes from './src/Routes';
import {Provider} from 'react-redux';
import store from './src/store/store';


export default class App extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (
      <Provider store={store} >
        <Routes /> 
      </Provider>    
    );

  }
}


