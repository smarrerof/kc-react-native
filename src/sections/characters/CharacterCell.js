import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions, Platform, View, Text } from 'react-native';

export default class CharacterCell extends Component {

  static defaultProps = {
    onSelect: () => {},
    item: {}
  }

  render() {
    const { item, onSelect } = this.props
    const image = item.thumbnail && !item.thumbnail.path.endsWith('image_not_available') ? 
      { uri: `${item.thumbnail.path.replace('http', 'https')}.${item.thumbnail.extension}` } : 
      require('react_marvel/src/resources/unknown.png')

    const name = item.name ? item.name : '???'

    return (
      <TouchableOpacity 
        style={ styles.container }
        onPress={ () => onSelect(item) }>

        <Image 
          source={ image }
          style={ styles.image }
          resizeMode={ 'contain' } />

        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
        </View>

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: Dimensions.get('window').width / 2 - 20,
    height: Dimensions.get('window').width / 2 - 20,
    ...Platform.select({
        ios: {
          shadowColor: 'rgba(255,255,255,0.1)',
          shadowOpacity: 1,
          shadowOffset: { height: 4, width: 4 },
          shadowRadius: 2,
        },
        android: {
          elevation: 4,
        },
    })
  },
  image: {
    width: Dimensions.get('window').width / 2 - 20,
    height: Dimensions.get('window').width / 2 - 20,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
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

