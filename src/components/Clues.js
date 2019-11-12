import React from 'react';
import Clue from './Clue'

class Clues extends React.Component {
  render(){
    return (
      <div>
        <h3><span className="badge badge-secondary">{this.props.across ? 'Clues Across:' : 'Clues Down:'}</span></h3>
        <ul className="list-group list-group-flush" style={{width: '18rem', overflow: 'auto', height: '47rem'}}>
          {this.props.clues.map(clue => <Clue clue={clue} key={clue}/>)}
        </ul>
      </div>
    )
  }
}

export default Clues