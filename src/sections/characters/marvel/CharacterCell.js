import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native';

export default class CharacterCell extends Component {

  static defaultProps = {
    onSelect: () => {},
    item: {}
  }

  render() {
    const { item, onSelect } = this.props
    const image = item.thumbnail && !item.thumbnail.path.endsWith('image_not_available') ? 
      { uri: `${item.thumbnail.path.replace('http', 'https')}/landscape_large.${item.thumbnail.extension}` } : 
      require('react_marvel/src/resources/unknown.png')

    const name = item.name ? item.name : 'No name available'

    return (
      <TouchableOpacity 
        style={ styles.container }
        onPress={ () => onSelect(item) }>

        <Image 
          source={ image }
          style={ styles.image }
          resizeMode={ 'cover' } />

        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
        </View>

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5
  },
  image: {
    width: '100%',
    height: 200
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
})

