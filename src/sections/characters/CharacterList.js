import React, { Component } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'

/****** Redux ******/
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as CharactersActions from 'react_marvel/src/redux/actions/characters'
/*******************/

import { Colors } from 'react_marvel/src/commons'
import CharacterCell from './CharacterCell'


export class CharactersList extends Component {

  componentWillMount() {
    this.props.fetchCharactersList();
  }

  onSelect(character) {
    this.props.updateSelected(character);
  }

  renderItem(item, index) {
    return <CharacterCell
      item={ item }
      onSelect={ (character) => this.onSelect(character) }
    />
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={ this.props.list }
          renderItem={ ({item, index}) => this.renderItem(item, index) }
          keyExtractor={ (item, index) => item.id }
          extraData={ this.props }
          numColumns={ 2 }
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.characters.list,
    isFetching: state.characters.isFetching
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchCharactersList: () => {
      dispatch(CharactersActions.fetchCharactersList())
    },
    updateSelected: (character) => {
      dispatch(CharactersActions.updateCharacterSelected(character))
      Actions.CharacterView({ title: character.name })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 20,
    paddingTop: 60
  }
})
