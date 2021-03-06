import React, { Component } from 'react'
import { SectionList, FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native'

/****** Redux ******/
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as CharactersActions from 'react_marvel/src/redux/actions/characters'
/*******************/

import { Colors } from 'react_marvel/src/commons'
import * as constants from 'react_marvel/src/webservices/constants'
import { Spinner } from 'react_marvel/src/widgets'
import CustomCharacterCell from './custom/CharacterCell'
import MarvelCharacterCell from './marvel/CharacterCell'


export class CharactersList extends Component {

  constructor(props) {
    super(props)
    this.renderCustomItem = this.renderCustomItem.bind(this)
    this.renderMarvelItem = this.renderMarvelItem.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
  }

  componentWillMount() {
    this.props.fetchCustomCharactersList()
    this.props.initCharactersList()
  }

  onCustomSelect(character) {
    console.log('CharacterList onSelect', character)
    this.props.updateCustomSelected(character)
  }

  onMarvelSelect(character) {
    console.log('CharacterList onSelect', character)
    this.props.updateMarvelSelected(character)
  }

  onEndReached() {
    if (this.props.list.length < this.props.total && !this.props.isFetching) {
      const newOffset = this.props.offset + constants.LIMIT
      this.props.fetchCharactersList(newOffset)
    }
  }

  // Renders (header, footer and item)
  renderSectionHeader(section) {
    return (
      <View style={ styles.headerSectionContainer }>
        <Text style={ styles.headerSectionText }>{section.title}</Text>
      </View>
    )
  }

  renderSectionFooter(section) {
    if (section.title === 'Custom')
      return this.renderCustomFooter()
    else if (section.title === 'Marvel')
      return this.renderMarvelFooter();
  }

  renderCustomFooter() {
    return (
      <Spinner 
        isVisible={ this.props.isCustomFetching }
      />
    )
  }

  renderMarvelFooter() {
    return ( 
      <Spinner 
        isVisible={ this.props.isFetching }
      />
    )
  }

  renderCustomItem(item, index) {
    return <CustomCharacterCell
      item={ item }
      onSelect={ (character) => this.onCustomSelect(character) }
    />
  }

  renderMarvelItem(item, index) {
    return <MarvelCharacterCell
      item={ item }
      onSelect={ (character) => this.onMarvelSelect(character) }
    />
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          renderSectionHeader={ ({section}) => this.renderSectionHeader(section) }
          renderSectionFooter={ ({section}) => this.renderSectionFooter(section) }
          sections={[
            { data: this.props.customList, 
              title: "Custom", 
              renderItem: ({item}) => this.renderCustomItem(item),
              keyExtractor: (item) => item.name
            },
            { data: this.props.list, 
              title: "Marvel", 
              renderItem: ({item}) => this.renderMarvelItem(item),
              keyExtractor: (item) => item.id,
            },
          ]}
          onEndReached={ this.onEndReached }
          onEndReachedThreshold={ 0.3 }
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isCustomFetching: state.characters.isCustomFetching,
    customList: state.characters.customList,
    isFetching: state.characters.isFetching,
    list: state.characters.list,
    total: state.characters.total,
    offset: state.characters.offset
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchCustomCharactersList: () => {
      dispatch(CharactersActions.fetchCustomCharactersList())
    },
    updateCustomSelected: (character) => {
      dispatch(CharactersActions.updateCharacterSelected(character))
      Actions.CustomCharacterView({ title: character.name })
    },
    initCharactersList: () => {
      dispatch(CharactersActions.initCharactersList())
    },
    fetchCharactersList: (offset) => {
      dispatch(CharactersActions.updateCharactersListOffset(offset))
      dispatch(CharactersActions.fetchCharactersList())
    },
    updateMarvelSelected: (character) => {
      dispatch(CharactersActions.updateCharacterSelected(character))
      Actions.MarvelCharacterView({ title: character.name })
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
  },
  headerSectionContainer: {
    backgroundColor: Colors.primary,
    padding: 10
  },
  headerSectionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
})
