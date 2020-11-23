import React from 'react'
import styled from 'styled-components'
import UserList from '../components/UserList'
import { device } from '../config/device';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  box-sizing: border-box; 
  margin: 0 auto;

  @media ${device.tablet} { 
    padding: 0 25px; 
    width: 1100px;
  }

  @media ${device.mobile} { 
    padding: 0 10px;
  }
`

const TitleWrapper = styled.div`
  align-self: left;
  
  @media ${device.tablet} { 
    margin-top: 25px;
    margin-bottom: 15px;
  }

  @media ${device.mobile} { 
    margin-top: 15px;
    margin-bottom: 5px;
  }
`

const Title = styled.h2`
  padding: 0;
  margin: 0;
  font-weight: normal;
  color: ${props => props.theme.primaryColor};

  @media ${device.tablet} { 
    font-size: 35px;
  }

  @media ${device.mobile} { 
    font-size: 33px;
  }
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



