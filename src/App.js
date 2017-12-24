/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar, StyleSheet } from 'react-native'
import { Actions, Scene, Router } from 'react-native-router-flux'

/****** Redux ******/
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from 'react_marvel/src/redux/reducers'
const reducer = combineReducers(reducers)
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
/*******************/

import * as webservices from 'react_marvel/src/webservices/webservices'
import { Colors } from 'react_marvel/src/commons'

import CharacterList from 'react_marvel/src/sections/characters/CharacterList'


export default class App extends Component {

  componentWillMount() {
    webservices.configureAxios()
    StatusBar.setBarStyle('light-content') // iOS StatusBar light style
  }

  render() {
    return (
      <Provider store={ store }>
        <Router>
          <Scene key="root">

            <Scene
              key={'CharacterList'}
              component={CharacterList}
              hideNavBar
            />

          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Colors.navBar
  }
});
