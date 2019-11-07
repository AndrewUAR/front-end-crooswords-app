import React from 'react';
import Boxes from './Boxes';

class Crossword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: []
    }
  }

  componentDidMount(){
    fetch(`https://raw.githubusercontent.com/doshea/nyt_crosswords/master/2017/04/12.json`)
      .then(resp => resp.json())
      .then(data => this.createGrid(data))
  }

  createGrid = (data) => {
    const gridLetters = data.grid
    const gridNums = data.gridnums 

    for (let i = 0; i < gridLetters.length; i++) {
      if (gridLetters[i] === '.') {
        let newBox = {id: i, letter: null}
        let newGrid = [...this.state.grid, newBox]
        this.setState({grid : newGrid})
      } else {
        if (gridNums[i] > 0) {
          let newBox = {id: i, letter: gridLetters[i], number: gridNums[i]}
          let newGrid = [...this.state.grid, newBox]
          this.setState({grid : newGrid})
        } else {
          let newBox = {id: i, letter: gridLetters[i]}
          let newGrid = [...this.state.grid, newBox]
          this.setState({grid : newGrid})
        }
      }
    }
  }

  render() {
    return (
      <div className="crossword">
        <Boxes grid={this.state.grid} />
      </div>
    )
  }
}


export default Crossword;