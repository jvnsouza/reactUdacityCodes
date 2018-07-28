import React from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, Platform } from 'react-native';
import styled from 'styled-components/native'
import * as API from './utils/api'
import * as color from './utils/color'
import setLocalNotification from './utils/helpers'
import { Constants } from 'expo'
import { NavigationActions } from 'react-navigation'
import AppHeader from './components/AppHeader'
import RootNavigator from './routes'

const Wrapper = styled.View`
  background: #fff;
  padding-bottom: 40;
`

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: [],
      loadingDecks: false,
      fetchedDecks: false
    }
  }
  refreshList = () => {
    this.setState({loadingDecks: true, fetchedDecks: false})
    return API.getDecks().then(decks => {
      this.setState({decks: JSON.parse(decks), fetchedDecks: true, loadingDecks: false}) 
    })
  }
  componentDidMount() {
    setLocalNotification()
  }
  newDeck = ({navigation, item}) => {
    this.refreshList().then(() => {
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'}),
          NavigationActions.navigate({ routeName: 'Deck', params: {item}}),
        ]
      })
      navigation.dispatch(resetAction)
    })
  }
  componentDidMount() {
    this.refreshList()
  }
  render() {
    const { decks, loadingDecks, fetchedDecks } = this.state
    const { refreshList, newDeck } = this
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor={color.primary}  barStyle="light-content" />
        {!!(Platform.OS !== 'ios') && (
          <View style={{ backgroundColor: color.primary, height: Constants.statusBarHeight }} />
        )}
        <View style={{flex: 1}}>
          <RootNavigator screenProps={{refreshList, newDeck, decks, loadingDecks, fetchedDecks}} />
        </View>
      </View>
    );
  }
}