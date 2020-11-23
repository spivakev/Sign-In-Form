import React from 'react'
import styled from 'styled-components'


const TableCell = styled.td`
  box-sizing: border-box;
  height: 30px;
  padding: 5.5px;
  border: 1px solid ${props => props.theme.tableBorderColor};
`


const User = props => {
  let dateFormat = require('dateformat');

  return (
    <tr>
      <TableCell>{props.user.id}</TableCell>
      <TableCell>{props.user.username}</TableCell>
      <TableCell>{props.user.first_name}</TableCell>
      <TableCell>{props.user.last_name}</TableCell>
      <TableCell>{props.user.is_active ? 'Yes' : 'No'}</TableCell>
      <TableCell>{props.user.last_login ? dateFormat(props.user.last_login, "dd.mm.yyyy HH:MM:ss") : ''}</TableCell>
      <TableCell>{props.user.is_superuser ? 'Yes' : 'No'}</TableCell>
    </tr>
  )
}

export default User;
