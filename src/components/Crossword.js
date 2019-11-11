import React from 'react';
import Boxes from './Boxes';
import Clues from './Clues'

class Crossword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      clues: {},
      corrects: 0
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

  createGrid = (data) => {
    
    const gridLetters = data.grid
    const gridNums = data.gridnums 

    for (let i = 0; i < gridLetters.length; i++) {
      let newGrid;
      let newBox;

      if (gridLetters[i] === '.') {
        newBox = {id: i, letter: null, solved: false}
        newGrid = [...this.state.grid, newBox]
      } else {
        if (gridNums[i] > 0) {
          newBox = {id: i, letter: gridLetters[i], number: gridNums[i], solved: false}
          newGrid = [...this.state.grid, newBox]
        } else {
          newBox = {id: i, letter: gridLetters[i], solved: false}
          newGrid = [...this.state.grid, newBox]
        }
      }
      this.setState({clues: data.clues, grid : newGrid})
    }
  }

  handleCorrectLetter = (value, id, letter) => {
    console.log(letter)
    let updatedGrid
    if(value.toLowerCase() === letter.toLowerCase()){
      updatedGrid = this.state.grid.map(box => {
        if(box.id === id){
          return {
            ...box, solved: true
          }
        } else {
          return box
        }
      })
    } else {
      updatedGrid = this.state.grid.map(box => {
        if(box.id === id){
          return {
            ...box, solved: false
          }
        } else {
          return box
        }
      })
    }
    this.setState({grid:updatedGrid})
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.grid !== prevState.grid){
      this.countSolved()
    }
  }

  countSolved = () => {
    let countSolved = 0
      this.state.grid.forEach(element => {
        if(element.solved === true){
          countSolved++
        }
      });
    this.setState({corrects: countSolved})
  }


  render() {
    
    return (
      <div className="crossword">
        <div><Boxes grid={this.state.grid} handleCorrectLetter={this.handleCorrectLetter}/></div>
        {/* <div>{this.state.clues && <Clues clues={this.state.clues} />}</div> */}
      </div>
    )
  }
}


export default Crossword;
