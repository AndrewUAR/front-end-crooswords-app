import React from 'react';
import Clue from './Clue'

class Clues extends React.Component {
  render(){
    console.log(this.props.clues)
    return (
      <div>
        {this.props.clues.map(clue => <Clue clue={clue} />)}
      </div>
    )
  }
}

export default Clues