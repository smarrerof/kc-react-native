import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'

/****** Redux ******/
import { connect } from 'react-redux'
import * as CharactersActions from 'react_marvel/src/redux/actions/characters'
/*******************/

import { Colors } from 'react_marvel/src/commons'
import { Button, Input } from 'react_marvel/src/widgets'


export class CharacterNew extends Component {

  constructor(props) {
    super(props)

    this.state = {
      image: null,
      name: '',
      nameError: '',
      description: ''
    }
  }

  validateForm() {
    let valid = true
    let errors = {}

    if (!this.state.name) {
      errors.name = 'The name is required'
      valid = false
    }

    this.setState({
      nameError: errors.name ? errors.name : ''
    })

    return valid
  }

  onSubmit() {
    if (this.validateForm()) {

      const data = {
        name: this.state.name,
        description: this.state.description,
        image: '' //this.state.image ? 'data:image/jpeg;base64,' + this.state.image.data : null
      }

      this.props.postCharacter(data)
    }
  }

  render() {
    const imageUri = ''
    const imageButtonText = 'Select an image'

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={imageUri}
            style={styles.imageContainerBackground}
            resizeMode={'cover'}
          />
          <TouchableOpacity style={styles.button} onPress={() => this.onSelectImageTapped()}>
            <Text style={styles.textButton}>{imageButtonText}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Input
            onChangeText={(v) => this.setState({ name: v })}
            value={this.state.name}
            error={this.state.nameError}
            label={'Name:'}
            placeholder={'eg (Spider man)'}
          />
        </View>

        <View style={styles.inputContainer}>
          <Input
            onChangeText={(v) => this.setState({ description: v })}
            value={this.state.description}
            error={this.state.descriptionError}
            label={'Description:'}
            placeholder={'eg (...)'}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={'Save'}
            onPress={() => this.onSubmit()}
            isFetching={this.props.isFetching}
          />
        </View>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.characters.isFetching
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    postCharacter: (data) => {
      dispatch(CharactersActions.postCharacter(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterNew)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    height: 200,
    backgroundColor: 'grey',
    justifyContent: 'center'
  },
  imageContainerBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  button: {
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 6
  },
  textButton: {
    color: 'white',
    fontWeight: '600'
  },
  inputContainer: {
    padding: 20
  },
  buttonContainer: {
    padding: 20
  }
})