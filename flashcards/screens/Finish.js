import React, { Component } from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components/native'
import { Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import * as API from '../utils/api'
import * as color from '../utils/color'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'

const Title = styled.Text`
  color: ${color.primaryBlack};
  font-size: 24;
  text-align: center;
`

const Count = styled.Text`
  color: #555;
  font-size: 18;
  text-align: center;
`

const Wrapper = styled.View`
  border-color: ${color.primaryBlack};
  border-width: 1;
  border-top-width: 0;
  padding-top: 25;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom:  25;
`



class Finish extends Component {
  backToDeck = () => {
    const backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction)
  }
  restartQuiz = (item) => {
    const resetAction = NavigationActions.reset({
      index: 2,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
        NavigationActions.navigate({ routeName: 'Deck', params: {item}}),
        NavigationActions.navigate({ routeName: 'Card', params: {item}})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)
  }
  render() {
      const { item = {}, score } = this.props.navigation.state.params
      const questionsCount = (item.questions || {}).length || 0
      return (
        <Wrapper>
          
          <Title>{item.title}</Title>
          <Count>{`Você acertou ${score} de ${questionsCount}`}</Count>

          <View style={{justifyContent: 'center', marginTop: 20}}>
            <Button
              raised
              containerViewStyle={{marginBottom: 10}}
              backgroundColor={color.primary}
              onPress={() => { this.restartQuiz(item) }}
              title='Recomeçar quiz' />
            <Button
              raised
              onPress={() => { this.backToDeck() }}
              backgroundColor={color.primaryBlack}
              containerViewStyle={{marginBottom: 10}}
              title='Voltar ao baralho' />
          </View>
        </Wrapper>
      )
    }
};

export default Finish;