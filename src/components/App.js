import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Authorization from '../views/Authorization'
import Users from '../views/Users'

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;

`

const FormWrapper = styled.div`
  margin-top: 15vh;
`

class App extends React.PureComponent {
  render() {
    return (
      <Router basename={window.location.pathname || ''}>
        <Route path="/users" component={Users} />
        <Route exact path="/" component={Authorization} />
      </Router>
    )
  }
}


export default App;
