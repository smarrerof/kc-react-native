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

  componentWillMount() {
    this.props.initCharacterComicList()
    this.props.fetchCharacterExtra()
  }

  loadMore(section) {
    switch (section.title) {
      case "Comics":
        if (this.props.comics.length < this.props.comicsTotal && !this.props.isComicsFetching) {
          const newOffset = this.props.comicsOffset + 10
          this.props.fetchCharacterComicList(newOffset)
        }
      default: 
        break;
    }
  }

  renderSectionHeader(section) {
    return (
      <View style={ styles.headerSectionContainer }>
        <Text style={ styles.headerSectionText }>{section.title}</Text>
      </View>
    )
  }

  renderSectionFooter(section) {
    switch (section.title) {
      case "Comics":
        return (
          <View>
            {
              this.props.comics.length < this.props.comicsTotal &&
              <Button
                containerStyle={ styles.buttonContainerStyle }
                label={ 'Load more' }
                isFetching={ this.props.isComicsFetching }
                onPress={ () => this.loadMore(section) }
              />
            }
          </View>
        )
      default:
        return (
          <View>
          </View>
        )
    }
  }

  renderItemImageText(item) {
    const image = { uri: item.thumbnail.path.replace('http', 'https') + '/portrait_small.' + item.thumbnail.extension }
    const title = item.title

    return <View style={ styles.itemContainer }>
        <Image 
          source={ image } 
          style={ styles.itemImage } 
          resizeMode={ 'cover' }
        />
      <Text style={ styles.itemText }>{ item.title }</Text>
    </View>
  }

  renderItemText(item) {
    const title = item.title

    return <View style={ styles.itemContainer }>
      <Text style={ styles.itemText }>{ item.title }</Text>
    </View>
  }

  render() {
    const { character } = this.props
    const image = character ? { uri: `${character.thumbnail.path.replace('http', 'https')}/landscape_large.${character.thumbnail.extension}` } : null
    const name = character && character.name !== '' ? character.name : 'No name available'
    const description = character && character.description !== '' ? character.description : 'No description available'
   
    return (
      <ScrollView style={ styles.container } >
        <Image source={ image } style={ styles.image } resizeMode={ 'cover' } />
        <View style={ styles.textContainer }>
          <Text style={ styles.name }>{ name }</Text>
        </View>
        <View style={ styles.textContainer }>
          <Text style={ styles.description }>{ description }</Text>
        </View>
        <View style={ styles.textContainer }>
          <SectionList 
            renderSectionHeader={ ({section}) => this.renderSectionHeader(section) }
            renderSectionFooter={ ({section}) => this.renderSectionFooter(section) }
            sections={[
              { data: this.props.comics, 
                title: "Comics", 
                renderItem: ({item}) => this.renderItemImageText(item),
                keyExtractor: (item) => item.id 
              },
              { data: this.props.events, 
                title: "Events", 
                renderItem: ({item}) => this.renderItemImageText(item),
                keyExtractor: (item) => item.id  
              },
              { data: this.props.series, 
                title: "Series", 
                renderItem: ({item}) => this.renderItemImageText(item),
                keyExtractor: (item) => item.id  
              },
              { data: this.props.stories, 
                title: "Stories", 
                renderItem: ({item}) => this.renderItemText(item),
                keyExtractor: (item) => item.id  
              }
            ]}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      character: state.characters.item,
      
      comics: state.characters.comics,
      isComicsFetching: state.characters.isComicsFetching,
      comicsTotal: state.characters.comicsTotal,
      comicsOffset: state.characters.comicsOffset,
      
      events: state.characters.events,
      series: state.characters.series,
      stories: state.characters.stories
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    initCharacterComicList: () => {
      dispatch(CharactersActions.initCharacterComicList())
    },
    fetchCharacterComicList: (offset) => {
      dispatch(CharactersActions.updateCharacterComicListOffset(offset))
      dispatch(CharactersActions.fetchCharacterComicList())
    },
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
  // Button style
  buttonContainerStyle: {
    backgroundColor: 'gray'
  }
})