import React from 'react'
import User from './User'
import styled from 'styled-components'
import { device } from '../config/device';

const Input = styled.input`
  box-sizing: border-box;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.teriaryColor};
  width: 25%;

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

const InputWrapper = styled.div`
  @media ${device.tablet} { 
    margin-bottom: 25px;
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
  padding: 10px 15px;
  background-color: ${props => props.theme.tableHeaderColor};
  color: ${props => props.theme.buttonFontColor};
`


class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      filteredUsers: [],
      usernameFilter: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.getUsers();
  }

  async getUsers() {
    let url = 'http://emphasoft-test-assignment.herokuapp.com/api/v1/users/';
    let users = null;

    let token = null; // объявляем локальную переменную token

    if (localStorage.tokenData) { // если в localStorage присутствует tokenData, то берем её
      token = JSON.parse(localStorage.tokenData);
      console.log(`Токен из local storage ${token}`)
    } else {
      console.log('Токен не найден в local storage')
      //return window.location.replace(loginUrl); //loginUrl = '/' //если токен отсутствует, то перенаправляем пользователя на страницу авторизации
    }

    //access_token: 781bd9f1de084f4daa7ba2aa8a71a2eab855354e
    //'test_super',
    //'Nf<U4f<rDbtDxAPn',

    let options = {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=utf-8"
      },
    };

    if (token) { options.headers.Authorization = `Token ${token}`; }

    console.log('Из header:\n', options.headers.Authorization)

    let response = await fetch(url, options);
    let result = response.json()

    let usersList = [];

    if (response.ok) {
      result.then(function (data) {
        for (let item in data) {
          usersList.push(data[item])
        }

      }).then((data) => {
        let sortedArray = this.sortById(usersList.slice()); //// закончила тут
        this.setState({
          users: sortedArray,
          filteredUsers: sortedArray
        });
        console.log('users = ', this.state.users);
      }

      );
    } else {
      console.log('Список пользователей не был получен')
    }
  }

  sortById(arr) {
    arr.sort((a, b) => a.id > b.id ? 1 : -1);
    return arr.slice()
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ [name]: value });
    console.log('this.state[name]', this.state[name])
    this.filterByUsername(value);
  }

  filterByUsername(filter) {
    let filteredArr = this.state.users.filter((user) => user.username.indexOf(filter) !== -1)
    this.setState({ filteredUsers: filteredArr.slice() })
  }

  render() {
    const allUsers = this.state.filteredUsers.map(user =>
      <User key={user.id} user={user} />
    )

    //Enter a part of the username
    //Filter by username...
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
      </>
    )
  }
}

export default UserList;