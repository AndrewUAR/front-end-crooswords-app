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

  componentDidMount(){
    if(localStorage.getItem('username') && !this.state.auth.username){
      let auth = {...this.state.auth}
      auth.username = localStorage.getItem('username')
      this.setState({auth})
      fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => {
        data.forEach(user => {
          if(user.username == localStorage.getItem('username')){
            let auth = {...this.state.auth};
            auth.id = user.id;
            auth.username = user.username;
            auth.password = user.password;
            this.setState({auth})
          }
        })
      })
    } else {
      console.log(this.state.auth)
    }
  }

  handleLogin(user, token){
    this.setState({
      auth: user
    })
    localStorage.setItem('username', user.username)
    localStorage.setItem('token', token)
    window.location.reload()
  }

  validateUser(username, password){
    if(!username){
      return "PLEASE ENTER A USERNAME"
    } else if(!password){
      return "PLEASE ENTER A PASSWORD"
    } else if(username.length < 8){
      return "USERNAME MUST BE GREATER THAN 8 CHARACTERS"
    } else if(/\s/.test(username)){
      return "USERNAME CANNOT CONTAIN SPACES"
    } else if(password.length < 8){
      return "PASSWORD MUST BE GREATER THAN 8 CHARACTERS"
    } else if (/\s/.test(password)){
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
        if(!this.validateUser(username, password)){
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
          this.handleLogin({username:username, password:password}, data.token)
        })
        } else {
          this.setState({error: this.validateUser(username, password)})
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
        <Crosswords className="row" user={this.state.auth}/>
      </div>
    );
  }
}

export default App;
