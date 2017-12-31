/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, Image } from 'react-native'
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
import CustomCharacterView from 'react_marvel/src/sections/characters/custom/CharacterView'
import MarvelCharacterView from 'react_marvel/src/sections/characters/marvel/CharacterView'
import CharacterNew from 'react_marvel/src/sections/characters/CharacterNew'

export default class App extends Component {

  componentWillMount() {
    webservices.configureAxios()
    StatusBar.setBarStyle('light-content') // iOS StatusBar light style
  }

  renderRightButton() {
    return (
      <TouchableOpacity style={ styles.buttonContainer } onPress={ () => { Actions.CharacterNew() } }>
        <Image
          style={ styles.button }
          source={ require('react_marvel/src/resources/add.png') }
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <Provider store={ store }>
        <Router>
          <Scene key="root">

            <Scene
              key={'CharacterList'}
              component={CharacterList}
              title='Characters'
              navigationBarStyle={ styles.navBar }
              navBarButtonColor={ 'white' }
              renderRightButton={ () => this.renderRightButton() }
            />

            <Scene
              key={'CustomCharacterView'}
              component={CustomCharacterView}
              navigationBarStyle={ styles.navBar } 
              navBarButtonColor={ 'white' }
            />

            <Scene
              key={'MarvelCharacterView'}
              component={MarvelCharacterView}
              navigationBarStyle={ styles.navBar } 
              navBarButtonColor={ 'white' }
            />

            <Scene 
              key={'CharacterNew'}
              component={ CharacterNew }
              navigationBarStyle={ styles.navBar } 
              navBarButtonColor={ 'white' }
              title={'New character'}
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
  },
  buttonContainer: {
    paddingRight: 10
  },
  button: {
    height: 24,
    width: 24
  }
});
