import FlipCard from 'react-native-flip-card'
import React, { Component } from 'react'
import { View, Text, TouchableNativeFeedback, SafeAreaView} from 'react-native'
import { NavigationActions } from 'react-navigation'
import styled from 'styled-components/native'
import { Button } from 'react-native-elements'
import * as color from '../utils/color'

const Title = styled.Text`
  color: ${(props) => props.hideResponse ? 'transparent' : color.primaryBlack};
  font-size: 24;
  text-align: center;
`

const Show = styled.Text`
  color: #000;
  font-size: 18;
  text-align: center;
  margin-top: 60px;
`

const Count = styled.Text`
  color: #555;
  font-size: 18;
  text-align: center;
`

const CardFront = styled.View`
  flex: 1;
  width: 300;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`
const CardBack = styled.View`
  flex: 1;
  width: 300;
  background-color: #fff;
  padding-top: 10;
  padding-right: 10;
  padding-bottom: 10;
  padding-left: 10;
  justify-content: center;
  align-items: center;
`

const CardText = styled.View`
  flex: 1;
`

const CardWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 20;
  padding-right: 20;
  padding-bottom: 20;
  padding-left: 20;
`

const Wrapper = styled.View`
  flex: 1;
  width: 100%;
`

const Steps = styled.View`
  padding-top: 5;
  padding-left: 20;
  padding-right: 20;
  padding-bottom: 5;
  justify-content: space-between;
`

const Step = styled.Text`
  color: ${color.primaryBlack};
  font-size: 20;
`

export default class Card extends Component {
  state = {
    disableCard: true,
    currentQuestion: 0,
    fliped: false,
    score: 0,
    hideResponse: true
  }
  handleFlipEnd = (fliped) => {
    this.setState(() => {
      const disableCard = !fliped
      const hideResponse = false;
      return {
        fliped,
        hideResponse,
        disableCard
      }
    })
  }
  handleFlipStart = (fliped) => {
    this.setState(() => {
      const hideResponse = true;
      return {
        fliped,
        hideResponse
      }
    })
  }
  nextCard = (answer) => {
    const { navigation } = this.props
    const { item = {} } = navigation.state.params
    this.setState(({currentQuestion, score}) => {
      if(currentQuestion + 1 >= (item.questions || []).length) {
        const resetAction = NavigationActions.reset({
          index: 2,
          actions: [
            NavigationActions.navigate({ routeName: 'Home'}),
            NavigationActions.navigate({ routeName: 'Deck', params: {item}}),
            NavigationActions.navigate({ routeName: 'Finish', params: {item, score: answer ? score + 1 :  score}})
          ]
        })
        this.props.navigation.dispatch(resetAction)
        return false
      }
      return {
        currentQuestion: currentQuestion + 1 < (item.questions || []).length ? currentQuestion + 1 :  currentQuestion,
        disableCard: true,
        hideResponse: true,
        fliped: false,
        score: answer ? score + 1 :  score
      }
    })
  }
  render() {
    const {children, questions, navigation, ...props} = this.props
    const { item } = navigation.state.params
    const { disableCard, fliped, currentQuestion, score, hideResponse } = this.state
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#efefef'}}>
        <Wrapper>
          <Steps>
            <Step>{`${currentQuestion + 1}/${(item.questions || {}).length || 0}`}</Step>
          </Steps>
          <CardWrapper> 
            <FlipCard 
              perspective={1000}
              friction={6}
              flipHorizontal={true}
              flipVertical={false}
              flip={fliped}
              clickable={true}
              onFlipEnd={this.handleFlipEnd}
              onFlipStart={this.handleFlipStart}
              syle={{borderWidth: 0}}>
              <CardFront>
                <Title>{item.questions[currentQuestion].question}</Title>
                <Show>{'Mostrar Resposta'.toUpperCase()}</Show>
              </CardFront>
              <CardBack>
                <Title hideResponse={hideResponse}>{item.questions[currentQuestion].answer}</Title>
              </CardBack>
            </FlipCard>
          </CardWrapper>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              raised
              large
              containerViewStyle={{marginBottom: 10, flex: 1}}
              backgroundColor={color.danger}
              disabled={disableCard} onPress={() => {this.nextCard(false)}}
              title='Incorreta' />
            <Button
              raised
              large
              disabled={disableCard} onPress={() => {this.nextCard(true)}}
              backgroundColor={color.success}
              containerViewStyle={{marginBottom: 10, flex: 1}}
              title='Correta' />
          </View>
        </Wrapper>
      </SafeAreaView>
      )
  }
}