import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, Image, Text, Dimensions, SectionList, TouchableOpacity, Modal } from 'react-native'

/****** Redux ******/
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as CharactersActions from 'react_marvel/src/redux/actions/characters'
/*******************/

import { Colors } from 'react_marvel/src/commons'
import { Button } from 'react_marvel/src/widgets'

export class CharacterView extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false
    }
  }

  componentWillMount() {
    this.props.initCharacterComicList()
    this.props.initCharacterEventList()
    this.props.initCharacterSerieList()
    this.props.initCharacterStoryList()
  }

  loadMore(section) {
    switch (section.title) {
      case "Comics":
        if (this.props.comics.list.length < this.props.comics.total && !this.props.comics.isFetching) {
          const newOffset = this.props.comics.offset + 10
          this.props.fetchCharacterComicList(newOffset)
        }
        break;
      case "Events":
        if (this.props.events.list.length < this.props.events.total && !this.props.events.isFetching) {
          const newOffset = this.props.events.offset + 10
          this.props.fetchCharacterEventList(newOffset)
        }
        break;
      case "Series":
        if (this.props.series.list.length < this.props.series.total && !this.props.series.isFetching) {
          const newOffset = this.props.series.offset + 10
          this.props.fetchCharacterSerieList(newOffset)
        }
        break;
      case "Stories":
        if (this.props.stories.list.length < this.props.stories.total && !this.props.stories.isFetching) {
          const newOffset = this.props.stories.offset + 10
          this.props.fetchCharacterStoryList(newOffset)
        }
        break;
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
              (this.props.comics.list.length === 0 ||
              this.props.comics.list.length < this.props.comics.total) &&
              <Button
                containerStyle={ styles.buttonContainerStyle }
                label={ 'Load more' }
                isFetching={ this.props.comics.isFetching }
                onPress={ () => this.loadMore(section) }
              />
            }
          </View>
        )
      case "Events":
        return (
          <View>
            {
              (this.props.events.list.length === 0 ||
              this.props.events.list.length < this.props.events.total) &&
              <Button
                containerStyle={ styles.buttonContainerStyle }
                label={ 'Load more' }
                isFetching={ this.props.events.isFetching }
                onPress={ () => this.loadMore(section) }
              />
            }
          </View>
        )
      case "Series":
        return (
          <View>
            {
              (this.props.series.list.length === 0 ||
              this.props.series.list.length < this.props.series.total) &&
              <Button
                containerStyle={ styles.buttonContainerStyle }
                label={ 'Load more' }
                isFetching={ this.props.series.isFetching }
                onPress={ () => this.loadMore(section) }
              />
            }
          </View>
        )
      case "Stories":
        return (
          <View>
            {
              (this.props.stories.list.length === 0 ||
              this.props.stories.list.length < this.props.stories.total) &&
              <Button
                containerStyle={ styles.buttonContainerStyle }
                label={ 'Load more' }
                isFetching={ this.props.stories.isFetching }
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

  onSelectImage(modalVisible, modalImage) {
    this.setState({ 
      modalVisible: modalVisible,
      modalImage: (modalImage ? modalImage : null)
    })
  }

  renderItemImageText(item) {
    const itemImage = { uri: item.thumbnail.path.replace('http', 'https') + '/portrait_small.' + item.thumbnail.extension }
    const modalImage = { uri: item.thumbnail.path.replace('http', 'https') + '/portrait_incredible.' + item.thumbnail.extension }
    const title = item.title

    return (
      <View style={ styles.itemContainer }>
        <TouchableOpacity
          onPress={ () => this.onSelectImage(true, modalImage) }>
          <Image 
            source={ itemImage } 
            style={ styles.itemImage } 
            resizeMode={ 'cover' }></Image>
        </TouchableOpacity>
        <Text style={ styles.itemText }>{ item.title }</Text>
      </View>
    )
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

    console.log('render', this.state.modalVisible, this.state.modalImage)
    return (
        <ScrollView style={ styles.container } >
          <Modal
            animationType={ 'slide' }
            transparent={ false }
            visible={ this.state.modalVisible }>
            <View style={ styles.modalContainer }>
              <TouchableOpacity
                onPress={ () => this.onSelectImage(false) }>
                <Image 
                  source={ this.state.modalImage } 
                  style={ styles.modalImage } 
                  resizeMode={ 'cover' } />
              </TouchableOpacity>
              <Button
                containerStyle={ styles.modalButton }
                label={ 'Close' }
                onPress={ () => this.onSelectImage(false) }
              />
            </View>
          </Modal>

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
                { data: this.props.comics.list, 
                  title: "Comics", 
                  renderItem: ({item}) => this.renderItemImageText(item),
                  keyExtractor: (item) => item.id 
                },
                { data: this.props.events.list, 
                  title: "Events", 
                  renderItem: ({item}) => this.renderItemImageText(item),
                  keyExtractor: (item) => item.id  
                },
                { data: this.props.series.list, 
                  title: "Series", 
                  renderItem: ({item}) => this.renderItemImageText(item),
                  keyExtractor: (item) => item.id  
                },
                { data: this.props.stories.list, 
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
    initCharacterEventList: () => {
      dispatch(CharactersActions.initCharacterEventList())
    },
    fetchCharacterEventList: (offset) => {
      dispatch(CharactersActions.updateCharacterEventListOffset(offset))
      dispatch(CharactersActions.fetchCharacterEventList())
    },
    initCharacterSerieList: () => {
      dispatch(CharactersActions.initCharacterSerieList())
    },
    fetchCharacterSerieList: (offset) => {
      dispatch(CharactersActions.updateCharacterSerieListOffset(offset))
      dispatch(CharactersActions.fetchCharacterSerieList())
    },
    initCharacterStoryList: () => {
      dispatch(CharactersActions.initCharacterStoryList())
    },
    fetchCharacterStoryList: (offset) => {
      dispatch(CharactersActions.updateCharacterStoryListOffset(offset))
      dispatch(CharactersActions.fetchCharacterStoryList())
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
    backgroundColor: 'gray',
    marginTop: 10
  },
  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalImage: {
    height: 450,
    width: 300
  },
  modalButton: {
    backgroundColor: 'gray',
    marginTop: 10,
    width: 300
  }
})