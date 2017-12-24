import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { Colors } from 'react_marvel/src/commons'


export default class CharacterView extends Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  }
})