import './styles/App.css';
import React, { useState, useEffect} from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import CreateGame from './pages/CreateGame'
import GamePage from './pages/GamePage'
import UpdateGame from './pages/UpdateGame'

function App() {
  return (
    <div className="App">
    </div>
  )
}

export default withRouter(App)
