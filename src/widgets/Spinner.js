import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

var Spinner = require('react-native-spinkit')

export default class Button extends Component {

  static defaultProps = {
    isVisible: false,
    size: 50,
    type: 'Pulse',
    color: 'white'
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          isVisible={ this.props.isVisible }
          size={ this.props.size }
          type={ this.props.type }
          color={ this.props.color }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
})
