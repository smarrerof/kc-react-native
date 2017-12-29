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

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
  }

  componentWillMount() {
    this.props.initCharactersList();
  }

  onSelect(character) {
    this.props.updateSelected(character);
  }

  onEndReached() {
    console.log('CharactersList onEndReached', this.props)
    if (this.props.list.length < this.props.total && !this.props.isFetching) {
      let newOffset = this.props.offset + 10
      this.props.fetchCharactersList(newOffset)
    }
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
          onEndReached={ this.onEndReached }
          onEndReachedThreshold={ 0.3 }
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.characters.list,
    total: state.characters.total,
    offset: state.characters.offset,
    isFetching: state.characters.isFetching
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    initCharactersList: () => {
      dispatch(CharactersActions.initCharactersList())
    },
    fetchCharactersList: (offset) => {
      dispatch(CharactersActions.updateCharactersListOffset(offset))
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
    paddingTop: 5,
    paddingBottom: 20
  }
})
