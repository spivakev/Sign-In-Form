import { React, Component } from 'react'
import styled from 'styled-components'
import { device } from '../config/device';
import { Redirect } from 'react-router-dom';

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

const Title = styled.h2`
  padding: 0;
  margin: 0;
  font-size: 35px;
  font-weight: normal;
  color: ${props => props.theme.primaryColor};
`


const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.tablet}  { 
    max-width: 350px;
  }

  @media ${device.mobile} { 
    max-width: 250px;
  }

`

const ErrorMessage = styled.p`  
  padding: 0;
  margin: 0;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 10px;
  color: ${props => props.theme.errorColor};
`

const InputWrapper = styled.div`
  @media ${device.tablet} { 
    margin-bottom: 25px;
  }

  @media ${device.mobile} { 
    margin-bottom: 15px;
  }
`


const Input = styled.input`
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

const Btn = styled.button`
  border: none;
  padding: 15px;
  width: 100%;
  background-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.buttonFontColor};
  text-transform: uppercase;
  font-weight: 700;
  line-height: 100%;
  cursor: pointer;
  transition: background 0.3s, brightness 0.1s;

  &:hover {
    background-color: ${props => props.theme.buttonHoverColor};
  }

  &:active {
    filter: brightness(90%);
  }

  &:focus {
    outline: 0;
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

const StyledLink = styled.a`
  font-size: 12px;
  color: ${props => props.theme.primaryColor};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.secondaryColor}; 
    text-decoration: underline
  }
`




export default class AuthorizationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '', //'test_super',
      password: '', //'Nf<U4f<rDbtDxAPn',
      formErrors: { username: '', password: '' },
      usernameValid: false,
      passwordValid: false,
      formValid: false,
      errorMessage: '',
      redirect: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkUser = this.checkUser.bind(this);///////
    this.validate = this.validate.bind(this);///////
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value } /*,
      () => { this.validateField(name, value) }*/);
  }

  handleSubmit(event) {
    this.setState({ submitted: true });
    event.preventDefault();
    this.validateForm()
    console.log('formValid', this.state.formValid)
    if (this.state.formValid) {
      this.checkUser();
    }
  }


  async checkUser() {
    let url = 'http://emphasoft-test-assignment.herokuapp.com/api-token-auth/';
    let data = {
      "username": this.state.username,
      "password": this.state.password
    }

    let options = {
      method: 'POST',
      headers: {
        //'Accept': 'application/json', //
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    };

    let response = await fetch(url, options);
    let result = await response.json();

    if (response.status === 200) {
      this.setState({
        access_token: result['token']
      })

      this.saveToken(result['token']);
      this.setState({ redirect: '/users' })

    } else {
      this.setState({ errorMessage: 'Неверное имя пользователя или пароль' })
    }
  }

  saveToken(token) {
    localStorage.setItem('tokenData', JSON.stringify(token));
  }

  errorClass(error) {
    return (!error ? '' : 'has-error');
  }

  validate() {
    let usernameError = '';

    if (!this.state.username) {
      usernameError = 'Введите логин'
    } else if (this.state.username.length < 1 || this.state.username.length > 20) {
      usernameError = 'Логин должен содержать от 1 до 20 символов';
    } else if (/^[a-zA-Z1-9-_]+$/.test(this.state.username) === false) {
      usernameError = 'Логин может содержать только латинские буквы, цифры, тире или знак подчеркивания';
    } else if (parseInt(this.state.username.substr(0, 1))) {
      usernameError = 'Логин должен начинаться с буквы';
    } else usernameError = ''

    let passwordError = (!this.state.password) ? 'Введите пароль' : ''
    let validUsername = (usernameError) ? false : true;
    let validPassword = (passwordError) ? false : true;
    let errorToShow = (usernameError) ? usernameError : passwordError; // вынести в отдельную функцию?

    console.log('username: ', this.state.username, passwordError)
    console.log('password: ', this.state.password, passwordError)

    this.setState({
      formErrors: {
        username: usernameError,
        password: passwordError
      },
      usernameValid: validUsername,
      passwordValid: validPassword,
      formValid: validUsername && validPassword,
      errorMessage: errorToShow
    })
  }


  validateForm() {
    this.validate();
    console.log('this.state', this.state)
    this.setState({ formValid: this.state.usernameValid && this.state.passwordValid });
  }



  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <FormWrapper onSubmit={this.handleSubmit} >
        <TitleWrapper>
          <Title>Вход</Title>
        </TitleWrapper>
        <ErrorWrapper>
          <ErrorMessage> {this.state.errorMessage} </ErrorMessage>
        </ErrorWrapper>

        <InputWrapper>
          <Input type="text" name="username" value={this.state.username} className={this.errorClass(this.state.formErrors.username)} onChange={this.handleChange} placeholder="Логин" autocomplete="on" />
        </InputWrapper>
        <InputWrapper>
          <Input type="password" name="password" value={this.state.password} className={this.errorClass(this.state.formErrors.password)} onChange={this.handleChange} placeholder="Пароль" autocomplete="on" />
        </InputWrapper>
        <ButtonWrapper >
          <Btn type="submit" onClick={this.handleSubmit} >Войти</Btn>
        </ButtonWrapper>
        <LinksWrapper>
          <StyledLink href="#">Забыли пароль?</StyledLink>
          <StyledLink href="#">Зарегистрироваться</StyledLink>
        </LinksWrapper>
      </FormWrapper>
    )
  }
}