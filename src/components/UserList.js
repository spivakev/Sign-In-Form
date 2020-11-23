import React from 'react'
import User from './User'
import styled from 'styled-components'
import { device } from '../config/device';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

const Input = styled.input`
  box-sizing: border-box;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.teriaryColor};

  @media ${device.tablet} { 
    padding: 10px 15px;
    min-width: 220px;
  }

  @media ${device.mobile} { 
    font-size: 14px;
    padding: 7px 15px;
    min-width: 200px;
  }

   &:focus {
    outline: none;
    border-bottom: 1px solid ${props => props.theme.primaryColor};
  }
`

const InputWrapper = styled.div`
  @media ${device.tablet} { 
    margin-bottom: 20px;
  }

  @media ${device.mobile} { 
    margin-bottom: 15px;
  }
`

const Table = styled.table`
  border-collapse: collapse;
   
`

const TableHeader = styled.th`
  border: 1px solid #${props => props.theme.tableHeaderColor};
  padding: 11px 15px;
  background-color: ${props => props.theme.tableHeaderColor};
  color: ${props => props.theme.buttonFontColor};
`

const Text = styled.p`
  text-align: center;
`

const LoaderWrapper = styled.p`
  margin-top: 30px;
  text-align: center;
`


class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      filteredUsers: [],
      usernameFilter: '',
      loading: true //отвечает за отображение Loader'а
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.getUsers();
  }

  async getUsers() { //метод получения списка пользователей с сервера
    let url = 'http://emphasoft-test-assignment.herokuapp.com/api/v1/users/';

    let token = null;

    //проверяем, была ли до этого авторизация (сохранен ли токен в localStorage)
    if (localStorage.tokenData) {
      token = JSON.parse(localStorage.tokenData);
    } else {
      console.log('Токен не найден в local storage') //если токен не найден, перенаправляем на страницу авторизации
      return window.location.replace('/');
    }

    let options = {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=utf-8"
      },
    };

    //если токен найден, помещаем его в заголовок запроса
    if (token) { options.headers.Authorization = `Token ${token}`; }

    let response = await fetch(url, options);
    let result = response.json()

    let usersList = [];

    if (response.status === 200) { //если запрос выполнен успешно (список пользователей получен)
      result.then(function (data) {
        for (let item in data) {
          usersList.push(data[item]) // сохраняем в массив полученные объекты
        }
      }).then((data) => {
        let sortedArray = this.sortById(usersList.slice());  //сортируем массив пользователей по Id
        this.setState({
          users: sortedArray,   //сохраняем отсортированный массив пользователей
          filteredUsers: sortedArray,
          loading: false
        });
      }
      );
    } else {
      console.log('Список пользователей не был получен')
    }
  }

  sortById(arr) { // метод для сортировки массива пользователей по id
    arr.sort((a, b) => a.id > b.id ? 1 : -1);
    return arr.slice()
  }

  handleChange(event) { //обработка ввода в поле фильтрации
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value });
    this.filterByUsername(value);
  }

  filterByUsername(filter) { //метод для фильтрации списка пользователей по значению, введенному в поле фильтрации
    let filteredArr = this.state.users.filter((user) => user.username.indexOf(filter) !== -1)
    this.setState({ filteredUsers: filteredArr.slice() })
  }

  render() {
    const allUsers = this.state.filteredUsers.map(user =>
      <User key={user.id} user={user} />
    )

    return (
      <>
        <InputWrapper>
          <Input type="text" name="usernameFilter" placeholder="Filter users by username..." onChange={this.handleChange} />
        </InputWrapper>

        <Table>
          <thead>
            <tr>
              <TableHeader>Id</TableHeader>
              <TableHeader>Username</TableHeader>
              <TableHeader>Last Name</TableHeader>
              <TableHeader>First Name</TableHeader>
              <TableHeader>Is Active</TableHeader>
              <TableHeader>Last Login</TableHeader>
              <TableHeader>Is Superuser</TableHeader>
            </tr>
          </thead>
          <tbody>
            {allUsers}
          </tbody>
        </Table>
        <LoaderWrapper>
          {this.state.loading && <Loader type="Oval" color="#83a296" timeout={2000} height={60} width={60} />}
        </LoaderWrapper>

        {this.state.filteredUsers.length === 0 && !this.state.loading && <Text>Username that contains <b>'{this.state.usernameFilter}'</b> not found</Text>}
      </>
    )
  }
}

export default UserList;