import styled from 'styled-components'
import AuthorizationForm from './components/AuthorizationForm'
import { device } from './config/device';

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;

 @media ${device.tablet} { 

  }

  @media ${device.mobile} { 
  }

`

const FormWrapper = styled.div`
  margin-top: 15vh;
`

function App() {
  return (
    <AppWrapper>
      <FormWrapper>
        <AuthorizationForm />
      </FormWrapper>
    </AppWrapper>
  );
}

export default App;
