import React from 'react'
import styled from 'styled-components'
import { device } from '../config/device';


const TableRow = styled.tr`
  
`

const TableCell = styled.td`
  box-sizing: border-box;
  padding: 4px;
  border: 1px solid ${props => props.theme.tableBorderColor};
`


const User = props => {

  let dateFormat = require('dateformat');

  /* let formattedDate = '';
   if (props.user.last_login) {
     let date = new Date(props.user.last_login);
     let day = date.getDate()
     let month = date.getDate()
   
       formattedDate = date.getDate() + "." + date.getDate() + "." + date.getFullYear()
   }*/



  return (
    <TableRow className="user">
      <TableCell className="user__id">{props.user.id}</TableCell>
      <TableCell className="user__username">{props.user.username}</TableCell>
      <TableCell className="user__first-name">{props.user.first_name}</TableCell>
      <TableCell className="user__last-name">{props.user.last_name}</TableCell>
      <TableCell className="user__is-active">{props.user.is_active ? 'Yes' : 'No'}</TableCell>
      <TableCell className="user__last-login">{props.user.last_login ? dateFormat(props.user.last_login, "dd.mm.yyyy HH:MM:ss") : ''}</TableCell>
      <TableCell className="user__is-superuser">{props.user.is_superuser ? 'Yes' : 'No'}</TableCell>
    </TableRow>
  )
}

export default User;
