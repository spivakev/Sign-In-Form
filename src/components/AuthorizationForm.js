import { React, Component } from 'react'
import styled from 'styled-components'
import Username from './Username'
import Password from './Password'
import Button from './Button'
import Title from './Title'
import Link from './Link'
import { device } from '../config/device';


const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media ${device.tablet}  { 
    padding: 48px 40px 40px;
    min-width: 350px;
  }

  @media ${device.mobile} { 
    padding: 28px 20px 20px;
    min-width: 250px;
  }

`

const TitleWrapper = styled.div`
  align-self: center;
  
  @media ${device.tablet} { 
    margin-bottom: 25px;
  }

  @media ${device.mobile} { 
    margin-bottom: 20px;
  }
`

const InputWrapper = styled.div`
  @media ${device.tablet} { 
    margin-bottom: 25px;
  }

  @media ${device.mobile} { 
    margin-bottom: 15px;
  }
`

const ButtonWrapper = styled.div`
  @media ${device.tablet} { 
    margin-top: 30px;
    margin-bottom: 12px;
  }

  @media ${device.mobile} { 
    margin-top: 12px;
    margin-bottom: 12px;
  }
`

const LinksWrapper = styled.div`
  display: flex;
  @media ${device.tablet} { 
    justify-content: space-around;
  }

  @media ${device.mobile} { 
    margin: 0 4px;
    justify-content: space-between;
  }

`


export default class AuthorizationForm extends Component {
  state = {
    username: null,
    password: null,
    submit: false
  }

  render() {
    return (
      <FormWrapper>
        <TitleWrapper>
          <Title />
        </TitleWrapper>
        <InputWrapper>
          <Username />
        </InputWrapper>
        <InputWrapper>
          <Password />
        </InputWrapper>
        <ButtonWrapper >
          <Button />
        </ButtonWrapper>
        <LinksWrapper>
          <Link text="Забыли пароль?" />
          <Link text="Зарегистрироваться" />
        </LinksWrapper>
      </FormWrapper>
    )
  }
}