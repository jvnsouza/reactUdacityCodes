import React from 'react'
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { Constants } from 'expo'
import styled from 'styled-components/native'
import * as color from '../utils/color'

const TextTitle = styled.Text`
  color: #fff;
  font-size: 18;
  padding-top: 15;
  padding-right: 15;
  padding-bottom: 15;
  padding-left: 15;
`

const AppHeader = ({children}) => (
  <View>
    <View style={{ backgroundColor: color.primary }}>
      <TextTitle>{children}</TextTitle>
    </View>
  </View>
)

export default AppHeader