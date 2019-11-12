import React from 'react';
import Crossword from './Crossword';


class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      isInvalid: false,
      redirect: false
    }
  }
  handleInputChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFormSubmit(e){
    e.preventDefault()

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
    this.setState({
        redirect: true
      })
      this.props.handleLogin({username: this.state.username, password: this.state.password})
  }

  render(){
    return (
      <div>
        <div>
        <h3>Login</h3>
        <form onSubmit={(e) => this.handleFormSubmit(e) }>
          <input name={'username'} onChange={(e) => this.handleInputChange(e)} value={this.state.username} />
          <input name={'password'} onChange={(e) => this.handleInputChange(e)} value={this.state.password} />
          <input type='submit' value='login' />
        </form>
        </div>
    </div>
    );
  }
}
export default Login;