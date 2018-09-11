import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import Quiz from './quiz'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/quiz' component={Quiz}/>
    </Switch>
  </main>
)

export default Main