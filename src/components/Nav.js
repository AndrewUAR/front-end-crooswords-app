import React from 'react';

const Nav = props => {

  return (
    <div style={{color: 'white'}}>
    {localStorage.getItem('username') != undefined ? 
        <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#">WE SOLVIN'</a>
        Hi, {localStorage.getItem('username')}!
      </nav>
    : 
    <nav className="navbar navbar-dark bg-dark">
    <a className="navbar-brand" href="#">WE SOLVIN'</a>
      { props.error ? <p>{props.error}</p> : null}
    <div className="dropdown">
      <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Login
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <form onSubmit={props.handleFormSubmit}>
        <input name={'username'}/>
        <input name={'password'}/>
        <input type='submit' value='login' />
      </form>
      </div>
    </div>
  </nav>
    }
    </div>
  )
}

export default Nav