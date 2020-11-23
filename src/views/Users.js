import React from 'react'
import styled from 'styled-components'
import UserList from '../components/UserList'
import { device } from '../config/device';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  padding: 0 25px; 
  width: 100%;
`

const TitleWrapper = styled.div`
  align-self: left;
  
  @media ${device.tablet} { 
    margin-top: 25px;
    margin-bottom: 20px;
  }

  @media ${device.mobile} { 
    margin-top: 15px;
    margin-bottom: 15px;
  }
`

const Title = styled.h2`
  padding: 0;
  margin: 0;
  font-size: 35px;
  font-weight: normal;
  color: ${props => props.theme.primaryColor};
`


class Users extends React.Component {
  render() {
    return (
      <Wrapper>
        <TitleWrapper>
          <Title>All Users</Title>
        </TitleWrapper>
        <UserList />
      </Wrapper>
    );
  }
}

export default Users;



