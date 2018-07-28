import React from 'react'
import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native'
import * as color from '../utils/color'

const LoadingArea = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const Loader = () => (
  <LoadingArea>
    <ActivityIndicator size="large" color={color.primaryBlack} />
  </LoadingArea>
)

export default Loader