import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
  border: none;
  padding: 15px 15px;
  width: 100%;
  background-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.buttonFontColor};
  text-transform: uppercase;
  font-weight: 700;
  line-height: 100%;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${props => props.theme.buttonHoverColor};
  }
`

const Button = () => (
  <Btn type="submit">
    Войти
  </Btn>
)

export default Button