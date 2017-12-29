import React, { Component } from 'react'
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native'

export default class Button extends Component {

  static defaultProps = {
    labelStyle: {},
    containerStyle: {},

    label: '',
    onPress: () => { },
    isFetching: false
  }

  _onPress() {
    if (!this.props.isFetching) {
      this.props.onPress()
    }
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={() => this._onPress()}>
        <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
        {this.props.isFetching ? <ActivityIndicator animating color={'white'} style={styles.spinner} /> : null}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgb(240, 20, 30)',
    borderRadius: 4,
    flexDirection: 'row',
  },

  label: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },

  spinner: {
    marginLeft: 20,
  }
})
