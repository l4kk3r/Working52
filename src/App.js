import React from 'react';
import {BrowserRouter, Switch, Route, useHistory, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Admin from './components/Admin'

const Routing = () => {
  return(
    <Switch>
      <Route path='/' component = {Home} exact />
      <Route path='/admin' component = {Admin} exact />
    </Switch>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
