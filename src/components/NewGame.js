import React from 'react';


class NewGame extends React.Component {
  render(){
    return (
      <div>
        {console.log(this.props)}
        <button onClick={() => this.props.handleNewGame()}>New Game</button>
      </div>
    )
  }
}

export default NewGame;