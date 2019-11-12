import React from 'react';
import logo from './logo.svg';
import './App.css';
import Crosswords from './components/Crosswords'
import Login from './components/Login'
import Nav from './components/Nav'


class App extends React.Component {

  state = {
    auth: {},
    error: ''
  }

  handleLogin(user, token){
    this.setState({
      auth: user
    })
    localStorage.setItem('username', user.username)
    localStorage.setItem('token', token)
    window.location.reload()
  }

  validatePassword(string){
    if(string.length < 8){
      return "PASSWORD MUST BE GREATER THAN 8 CHARACTERS"
    } else if (/\s/g.test(string)){
      return "PASSWORD CANNOT CONTAIN SPACES"
    } else {
      return
    }
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
        if(username && !this.validatePassword(password)){
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
          console.log(data)
          this.handleLogin({username:username, password:password}, data.token)
        })
        } else {
          this.setState({error: this.validatePassword(password)})
        }
      } else {
        this.handleLogin({username:username, password:password})
      }
    })
  }

  render(){
    console.log(this.state.auth.username)
    return (
      <div className="container">
        <Nav className="row" handleFormSubmit={this.handleFormSubmit} user={this.state.auth} error={this.state.error}/>
        <Crosswords className="row" />
      </div>
    );
  }
}

export default App;
