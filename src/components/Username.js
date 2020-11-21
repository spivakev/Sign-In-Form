import React from 'react'
import styled from 'styled-components'
import { device } from '../config/device';

const InputUsername = styled.input`
  box-sizing: border-box;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.teriaryColor};
  width: 100%;

  @media ${device.tablet} { 
    padding: 10px 15px;
  }

  @media ${device.mobile} { 
    padding: 7px 15px;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid ${props => props.theme.primaryColor};
  }
`

const Username = () => (
  <InputUsername type="text" placeholder="Логин" />
)

export default Username