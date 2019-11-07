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
    let date = this.randomDate()
    console.log(date);
    fetch(`https://raw.githubusercontent.com/doshea/nyt_crosswords/master/${date}.json`)
      .then(resp => resp.json())
      .then(data => this.createGrid(data))
  }

  randomDate() {
    let start = new Date("1979-01-01");
    let end = new Date("2014-12-31");
    var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2){
      month = '0' + month;
    }
    if (day.length < 2){
      day = '0' + day;
    }
    return [year, month, day].join('/');
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