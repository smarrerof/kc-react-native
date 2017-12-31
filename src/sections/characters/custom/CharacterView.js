import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, Image, Text, Dimensions, SectionList } from 'react-native'

/****** Redux ******/
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as CharactersActions from 'react_marvel/src/redux/actions/characters'
/*******************/

import { Colors } from 'react_marvel/src/commons'
import { Button } from 'react_marvel/src/widgets'


export class CharacterView extends Component {

  onDelete(character) {
    this.props.deleteCharacter(character);
  }

  render() {
    const { character } = this.props
    const image = character ? { uri: character.image } : null
    const name = character && character.name !== '' ? character.name : 'No name available'
    const description = character && character.description !== '' ? character.description : 'No description available'
   
    return (
      <ScrollView style={ styles.container }>
          <Image source={ image } style={ styles.image } resizeMode={ 'cover' } />
          <View style={ styles.textContainer }>
            <Text style={ styles.name }>{ name }</Text>
          </View>
          <View style={ styles.textContainer }>
            <Text style={ styles.description }>{ description }</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button label={'Delete'} onPress={() => this.onDelete(character)} isFetching={this.props.isFetching} />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      character: state.characters.item
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    deleteCharacter: (character) => {
      character && dispatch(CharactersActions.deleteCharacter(character))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
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
  headerSectionContainer: {
    backgroundColor: Colors.primary,
    padding: 10,
    marginTop: 10
  },
  headerSectionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 5
  },
  itemImage: {
    height: 100,
    width: 80
  },
  itemText: {
    color: 'white',
    flex: 1,
    paddingLeft: 10,
    fontWeight: '600'
  },
  buttonContainer: {
    margin: 20,
  }
})