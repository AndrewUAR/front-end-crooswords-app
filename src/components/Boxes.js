import React from 'react';
import Box from './Box';

class Boxes extends React.Component {
   render() {
     return (
      <div className="boxes">
         { this.props.grid.map(box => <Box key={box.id} letter={box.letter} number={box.number} handleChange={this.props.handleChange}/>)}
       </div>
     )
   }
}

export default Boxes;