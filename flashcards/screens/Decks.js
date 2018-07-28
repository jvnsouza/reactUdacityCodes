import React from 'react';
import { FlatList, Vibration, Alert, SafeAreaView } from 'react-native';
import styled from 'styled-components/native'
import * as API from '../utils/api'
import * as color from '../utils/color'
import Deck from '../components/Deck'
import Loader from '../components/Loader'

const Wrapper = styled.View`
  background: #fff;
  padding-bottom: 40;
`

const FirstDeckMessage = styled.Text`
  color: #010101;
  font-size: 20;
  text-align: center;
`

const FirstDeckMessageWrapper = styled.View`
  padding-top: 20;
  padding-right: 20;
  padding-bottom: 20;
  padding-left: 20;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default class Decks extends React.Component {
  handleLongPress = ({item}) => {
    Vibration.vibrate(100)
    Alert.alert(
      'Deseja excluir este deck?',
      `${item.title}`,
      [
        {text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Sim, Excluir!', onPress: () => this.removeDeck({key: item.key})},
      ],
      { cancelable: false }
    )
  }
  removeDeck = ({key}) => {
    const { screenProps } = this.props
    API.removeDeck({key}).then((decks) => {
      screenProps.refreshList()
    })
  }

  callEmptyDeck = () => {
    API.createDeck({title: 'Deck inicializador'}).then((item) => {
      console.log(item)
    })
    return null;
  }
  renderDecks = () => {
    const {navigation, screenProps = {}} = this.props
    return (screenProps.decks || []).length ? (
      <SafeAreaView style={{flex: 1, backgroundColor: '#efefef'}}>
        <FlatList
          style={{backgroundColor: '#efefef'}}
          data={screenProps.decks}
          renderItem={({item}) => (
            <Deck
              questions={item.questions}
              item={item}
              onLongPress={() => this.handleLongPress({item})}
              onPress={() => navigation.navigate('Deck', {item})}>{item.title}</Deck>
          )}
        />
      </SafeAreaView>
    ) : (
      API.createDeck({title: 'Dack de teste'}).then((item) => {
        // this.setState({title: ''})
        screenProps.newDeck({navigation, item})
        
      })
    );
  }
  renderLoading = () => {
    return (
      <Loader />
    )
  }
  render() {
    const {navigation, screenProps} = this.props
    return !screenProps.fetchedDecks && this.renderLoading() || this.renderDecks()
  }
}
