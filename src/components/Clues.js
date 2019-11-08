import React from 'react';
import Clue from './Clue'

class Clues extends React.Component {
  render(){
    console.log(this.props.clues)
    return (
      <div>
        <p>ACROSS</p>
        {this.props.across.map(clue => <Clue clue={clue} />)}
        <p>DOWN</p>
        {this.props.down.map(clue => <Clue clue={clue} />)}
      </div>
    )
  }
}

export default Clues