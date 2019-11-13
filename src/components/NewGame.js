import React from 'react';
import UserCard from './UserCard';


class NewGame extends React.Component {
  render(){
    return (
      <div className="container">
      <div className="col-md-12 text-center">
        <button type="button" className="btn btn-warning btn-lg" onClick={() => this.props.handleNewGame()}>New Game</button>
      </div>
      <div className="row">{this.props.users.map(user => <UserCard user={user}/>)}</div>
      </div>
    )
  }
}

export default NewGame;