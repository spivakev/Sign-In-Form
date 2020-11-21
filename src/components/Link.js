import React from 'react'
import styled from 'styled-components'

const StyledLink = styled.a`
  font-size: 12px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.secondaryColor}; 
    text-decoration: underline
  }
`

const Link = (props) => (
  <StyledLink href={props.href}>
    {props.text}
  </StyledLink>
)

export default Link