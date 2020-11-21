import React from 'react'
import styled from 'styled-components'

const FormTitle = styled.h2`
  padding: 0;
  margin: 0;
  font-size: 35px;
  font-weight: normal;
  color:${props => props.theme.primaryColor};

`

const Title = () => (
  <FormTitle>
    Вход
  </FormTitle>
)

export default Title