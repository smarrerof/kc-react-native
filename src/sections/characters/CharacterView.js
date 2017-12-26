import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, Image, Text, Dimensions, SectionList } from 'react-native'

/****** Redux ******/
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as CharactersActions from 'react_marvel/src/redux/actions/characters'
/*******************/

import { Colors } from 'react_marvel/src/commons'


export class CharacterView extends Component {

  componentWillMount() {
    this.props.fetchCharacterExtra();
  }

  renderSectionHeader(section) {

  }

  renderItem() {

  }

  render() {
    const { character } = this.props
    const image = character ? { uri: `${character.thumbnail.path.replace('http', 'https')}/landscape_large.${character.thumbnail.extension}` } : null
    const name = character ? character.name : ''
    const description = character ? character.description : ''

    console.log('comics', this.props.comics)

    return (
      <ScrollView>
      <View style={ styles.container } >
        <Image source={ image } style={ styles.image } resizeMode={ 'cover' } />
        <View style={ styles.textContainer }>
          <Text style={ styles.name }>{ name }</Text>
        </View>
        <View style={ styles.textContainer }>
          <Text style={ styles.description }>{ description }</Text>
        </View>
        <View style={ styles.textContainer }>
          <SectionList 
            renderSectionHeader={ ({section}) => 
              <View style={ styles.headerSectionContainer }>
                <Text style={ styles.headerSectionText }>{section.title}</Text>
              </View>
            }
            renderItem={ ({item}) => 
              <View style={ styles.itemContainer }>
                <Text style={ styles.itemText }>{ item.title }</Text>
              </View> 
            }
            sections={[
              { data: this.props.comics, title: "Comics" },
              { data: ["event1"], title: "Events" },
              { data: ["series1"], title: "Series" },
              { data: ["stories1"], title: "Stories" }
            ]}
          />
        </View>
      </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      character: state.characters.item,
      comics: state.characters.comics
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchCharacterExtra: () => {
      dispatch(CharactersActions.fetchCharacterExtra())
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
  headerSectionContainer: {
    backgroundColor: Colors.primary,
    padding: 10
  },
  headerSectionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  itemContainer: {
    padding: 5
  },
  itemText: {
    color: 'white'
  }
})