import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native'

/****** Redux ******/
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as CharactersActions from 'react_marvel/src/redux/actions/characters'
/*******************/

import { Colors } from 'react_marvel/src/commons'


export class CharacterView extends Component {

  render() {
    const { character } = this.props
    const image = character ? { uri: `${character.thumbnail.path.replace('http', 'https')}/landscape_large.${character.thumbnail.extension}` } : null
    const name = character ? character.name : ''
    const description = character ? character.description : ''

    console.log('image', image)

    return (
      <View style={ styles.container} >
        <Image source={ image } style={ styles.image } resizeMode={ 'cover' } />
        <View style={ styles.textContainer }>
          <Text style={ styles.name }>{ name }</Text>
        </View>
        <View style={ styles.textContainer }>
          <Text style={ styles.description }>{ description }</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      character: state.characters.item,
  }
}

export default connect(mapStateToProps, null)(CharacterView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  name: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  description: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
  },
})