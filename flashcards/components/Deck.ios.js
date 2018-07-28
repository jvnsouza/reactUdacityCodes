import React from 'react'
import { View, Text, Alert, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import * as API from '../utils/api'
import { Card, Button } from 'react-native-elements'
import * as color from '../utils/color'

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
  padding-top: 25;
  padding-bottom:  25;
`

const Deck = ({children, questions = [], item = {}, ...props}) => {
  const questionsCount = questions.length || 0
  return (
    <TouchableOpacity {...props} style={{marginBottom: 20}}>
      <Card >
        <Wrapper>
          <Title>{children}</Title>
          <Count>{(!!questionsCount && `${questionsCount} ${questionsCount === 1 ? 'pergunta' : 'perguntas'}`) || '0 perguntas' }</Count>
        </Wrapper>
      </Card>
    </TouchableOpacity>
  )
};

export default Deck;
