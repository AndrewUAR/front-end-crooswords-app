import React from 'react';
import logo from './logo.svg';
import './App.css';
import Crosswords from './components/Crosswords'
import Login from './components/Login'
import Nav from './components/Nav'


class App extends React.Component {

  state = {
    auth: {}
  }

  handleLogin(user){
    this.setState({
      auth: user
    })
  }

  handleLogout(){
    this.setState({
      auth: {} 
    })
  }

  render(){
    return (
      <div className="container">
        <Nav className="row"/>
        <Crosswords className="row" />
      </div>
    );
  }
}

export default App;
