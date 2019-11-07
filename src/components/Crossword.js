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
      .then(data => {
        this.createGrid(data)
      })
  }

  randomDate() {
    let start = new Date("1980-01-01");
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
    if (d.getDay() == 6){
      return [(year - 1), month, day].join('/');
    } else {
      return [year, month, day].join('/');
    }
  }

  handleChange = (e, letter) => {
    console.log(e.target.value.toLowerCase())
    console.log(letter.toLowerCase())
    if(e.target.value.toLowerCase() == letter.toLowerCase()){
      
    }
  }

  createGrid = (data) => {
    const gridLetters = data.grid
    const gridNums = data.gridnums 

    for (let i = 0; i < gridLetters.length; i++) {
      let newGrid;
      let newBox;

      if (gridLetters[i] === '.') {
        newBox = {id: i, letter: null}
        newGrid = [...this.state.grid, newBox]
      } else {
        if (gridNums[i] > 0) {
          newBox = {id: i, letter: gridLetters[i], number: gridNums[i]}
          newGrid = [...this.state.grid, newBox]
        } else {
          newBox = {id: i, letter: gridLetters[i]}
          newGrid = [...this.state.grid, newBox]
        }
      }
      this.setState({grid : newGrid})
    }
  }

  handleCorrectLetter = (event, id, letter) => {
    console.log(event, id, letter)
  }

  render() {
    // console.log(this.state)
    return (
      <div className="crossword">
        <Boxes grid={this.state.grid} handleCorrectLetter={this.handleCorrectLetter}/>
      </div>
    )
  }
}


export default Crossword;