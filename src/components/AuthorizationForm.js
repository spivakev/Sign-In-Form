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

  &.has-error {
    border-bottom: 1px solid ${props => props.theme.errorColor};
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
      formErrors: { username: '', password: '' }, // Тексты подсказок для невалидных полей (если они есть)
      usernameValid: false,
      passwordValid: false,
      formValid: false,
      errorMessage: '', //Текст ошибки валидации, который будет отображаться
      redirect: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { // Метод обработки ввода логина или пароля
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value }); //Сохраняем введенное в input значение
  }

  handleSubmit(event) { //Запускаем валидацию при нажатии кнопки
    event.preventDefault();
    this.validateForm()
  }

  validateForm() {
    let validationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;

    //Проверяем валидность логина. Если логин не соответствует условию, сохраняем текст подсказки, которую будем отображать пользователю
    if (!this.state.username) {
      validationErrors.username = 'Введите логин'
    } else if (this.state.username.length < 1 || this.state.username.length > 20) {
      validationErrors.username = 'Логин должен содержать от 1 до 20 символов';
    } else if (/^[a-zA-Z1-9-_]+$/.test(this.state.username) === false) {
      validationErrors.username = 'Логин может содержать только латинские буквы, цифры, тире или знак подчеркивания';
    } else if (parseInt(this.state.username.substr(0, 1))) {
      validationErrors.username = 'Логин должен начинаться с буквы';
    } else validationErrors.username = ''

    //Проверяем валидность пароля
    validationErrors.password = (!this.state.password) ? 'Введите пароль' : ''

    //Поля валидны, если не было сохранено ни одного текста подсказки
    usernameValid = (validationErrors.username === '') ? true : false;
    passwordValid = (validationErrors.password === '') ? true : false;

    //Если невалидны и логин и пароль, то отображаем текст подсказки для логина
    let errorToShow = (validationErrors.username) ? validationErrors.username : validationErrors.password;

    //Сохраняем результаты валидации
    this.setState({
      formErrors: validationErrors,
      usernameValid: usernameValid,
      passwordValid: passwordValid,
      formValid: usernameValid && passwordValid,
      errorMessage: errorToShow
    }, () => {
      if (this.state.formValid) { //Если форма валидна, отправляем запрос на сервер
        this.logIn();
      }
    })
  }


  async logIn() { //Отправка запроса на сервер для аутентификации
    let url = 'http://emphasoft-test-assignment.herokuapp.com/api-token-auth/';
    let data = {
      "username": this.state.username,
      "password": this.state.password
    }

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    };

    let response = await fetch(url, options);
    let result = await response.json();

    // Если запрос выполнен успешно, сохраняем токен в LocalStorage и перенаправляем на страницу со списком пользователей
    if (response.status === 200) {
      this.saveToken(result['token']);
      this.setState({ redirect: '/users' })
    } else {
      //Если запрос такое сочетание логин+пароль не найдено, отображаем пользователю подсказку
      this.setState({
        errorMessage: 'Неверное имя пользователя или пароль'
      })
    }
  }

  //сохранение токена в localStorage
  saveToken(token) {
    localStorage.setItem('tokenData', JSON.stringify(token));
  }

  //добавляем класс для невалидных полей input 
  errorClass(error) {
    return (!error ? '' : 'has-error');
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