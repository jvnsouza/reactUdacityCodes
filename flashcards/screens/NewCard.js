import React from 'react';
import { 
  View,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  SafeAreaView
} from 'react-native';
import styled from 'styled-components/native'
import * as API from '../utils/api'
import * as color from '../utils/color'
import Loader from '../components/Loader'
import { Button } from 'react-native-elements';
import { FormLabel, FormInput } from 'react-native-elements'

const Wrapper = styled.View`
  background: #fff;
  padding-bottom: 40;
`

export default class NewCard extends React.Component {
  state = {
    question: '',
    answer: '',
    loadingDeck: false
  }
  saveDeck = () => {
    const {navigation, screenProps} = this.props
    const { key } = navigation.state.params.item
    const { refreshDeck } = navigation.state.params
    const {question, answer} = this.state
    this.setState({loadingDeck: true})
    API.createCard({key, question: { question, answer}}).then(() => {
      screenProps.refreshList().then(() => {
        refreshDeck().then(navigation.goBack)
      })
    })
  }
  renderLoading = () => {
    return (
      <Loader />
    )
  }
  render() {
    const { loadingDeck } = this.state
    return !loadingDeck ? (
      <SafeAreaView style={{flex: 1, backgroundColor: '#efefef'}}>
        <KeyboardAvoidingView 
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          behavior="padding"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: '100%', paddingLeft: 10, paddingRight: 10}}>
              <FormLabel>Pergunta</FormLabel>
              <FormInput
                placeholder="Ex: Como diz Arroz em inglês?"
                inputStyle={{fontSize: 18}}
                value={this.state.question}
                onChangeText={(text) => this.setState({question: text})}
              />
              <FormLabel>Resposta</FormLabel>
              <FormInput
                placeholder="Ex: Rice."
                inputStyle={{fontSize: 18}}
                value={this.state.answer}
                onChangeText={(text) => this.setState({answer: text})}
              />
              <Button
                raised
                large
                containerViewStyle={{marginTop: 20}}
                onPress={this.saveDeck}
                backgroundColor={color.primary}
                title="Salvar Deck" />
            </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    ) : this.renderLoading()
  }
}