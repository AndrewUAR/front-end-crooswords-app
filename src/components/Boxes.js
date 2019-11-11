import React from 'react';
import Box from './Box';

class Boxes extends React.Component {
   render() {
     return (
      <div>
        <div>Correct: {this.props.corrects}/{this.props.totalWords}</div>
        <div className="boxes">
          { this.props.grid.map(box => <Box key={box.id} box={box}  handleInputLetter={this.props.handleInputLetter} />)}
        </div>
      </div>
     )
   }
}

export default Boxes;