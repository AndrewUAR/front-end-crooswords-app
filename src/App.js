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
    console.log(this.state.auth)
  }

  handleLogout(){
    this.setState({
      auth: {} 
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.username.value, e.target.password.value)
    this.handleLogin({username: e.target.username.value, password: e.target.password.value})
    // const reqObj = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(this.state)
    // }

    // fetch('http://localhost:3000/api/v1/auth', reqObj)
    //   .then( resp => resp.json())
    //   .then( data => {
    //     if(data.error) {
    //       this.setState({
    //         isInvalid: true
    //       })
    //     } else {
    //       this.props.handleLogin(data)
    //       this.props.history.push('/')
    //     }
    //   })
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
