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
    localStorage.setItem('username', user.username)
    window.location.reload()
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    let username = e.target.username.value;
    let password = e.target.password.value;
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => {
      let usernames = [];
      data.forEach(user => {
        console.log(user)
        usernames.push(user.username)
      })
      if(!usernames.includes(username)){
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
        .then( resp => resp.json())
        .then( data => {
          this.handleLogin({username:username, password:password})
        })
      } else {
        this.handleLogin({username:username, password:password})
      }
    })
  }

  render(){
    console.log(this.state.auth.username)
    return (
      <div className="container">
        <Nav className="row" handleFormSubmit={this.handleFormSubmit} user={this.state.auth}/>
        <Crosswords className="row" />
      </div>
    );
  }
}

export default App;
