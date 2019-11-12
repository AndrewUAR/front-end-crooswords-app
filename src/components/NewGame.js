import React from 'react';


class NewGame extends React.Component {
  render(){
    return (
      <div className="col-md-12 text-center">
        <button type="button" className="btn btn-warning btn-lg" onClick={() => this.props.handleNewGame()}>New Game</button>
      </div>
    )
  }
}

export default NewGame;