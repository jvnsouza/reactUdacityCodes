import React from 'react'
import { StackNavigator } from 'react-navigation'
import Quiz from '../screens/Quiz'
import Card from '../screens/Card'
import NewCard from '../screens/NewCard'
import Finish from '../screens/Finish'
import Decks from '../screens/Decks'
import * as color from '../utils/color'
import { Button } from 'react-native-elements'
import NewDeck from '../screens/NewDeck'

const RootNavigator = StackNavigator({
  Home: {
    screen: Decks,
    navigationOptions: ({ navigate, navigation }) => (
      {
        title: 'FlashCards',
        headerRight: (
          <Button
            backgroundColor={color.primary}
            onPress={() => {navigation.navigate('NewDeck')}}
            title="Novo Deck"
          />
        )
      }
    )
  },
  Deck: {
    screen: Quiz,
    navigationOptions: {
      title: 'Deck',
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'Novo Deck',
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Novo Card',
    }
  },
  Card: {
    screen: Card,
    navigationOptions: {
      title: 'Quiz',
    }
  },
  Finish: {
    screen: Finish,
    navigationOptions: {
      title: 'Fim',
    }
  }
},
{
  headerMode: 'screen',
  navigationOptions: {
    headerStyle: {
      backgroundColor: color.primary,
    },
    headerTintColor: '#ffffffdd'
  },
  cardStyle: { shadowColor: 'transparent' },
})

export default RootNavigator
