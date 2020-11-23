import React from 'react'
import styled from 'styled-components'
import AuthorizationForm from '../components/AuthorizationForm'


const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;

`

const FormWrapper = styled.div`
  margin-top: 15vh;
`

class Authorization extends React.Component {

  render() {
    return (
      <Wrapper>
        <FormWrapper>
          <AuthorizationForm />
        </FormWrapper>
      </Wrapper>
    );
  }
}


export default Authorization;
