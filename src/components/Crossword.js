import React from 'react';
import Boxes from './Boxes';
import Clues from './Clues'

class Crossword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: props.puzzle.grid,
      cluesAcross: props.puzzle.cluesAcross,
      cluesDown: props.puzzle.cluesDown,
      corrects: 0
    }
  }

  // componentDidMount(){
  //   fetch(`http://localhost:3000/puzzles`)
  //     .then(resp => resp.json())
  //     .then(data => {this.createGrid(data[3])})
  // }

  // createGrid = (data) => {
  //   const grid = data.gridLetters
  //   const gridnums = data.gridNumbers
  //   const gridwords = [];
  //   let across = 0;
  //   let down = 0;
  //   const findLetter = (id) => gridwords.find(grid => grid.id === id)

  //   for (let i = 0; i < grid.length; i++) {
  //     if (gridnums[i] > 0 && grid[i] !== '.' && grid[i + 15] !== '.') {
  //       gridwords.push({
  //         id: i,
  //         letter: grid[i],
  //         number: gridnums[i],
  //         across: true,
  //         clueAcross: across,
  //         clueDown: null,
  //         down: null,
  //         value: null
  //       })
  //       if ((i + 1) % 15 === 0) across = across + 1
  //     } else if (grid[i] !== '.' && grid[i + 15] !== '.' ) {
  //       gridwords.push({
  //         id: i,
  //         letter: grid[i],
  //         clueAcross: across,
  //         clueDown: null,
  //         across: true,
  //         down: null,
  //         value: null
  //       })
  //       if ((i + 1) % 15 === 0) across = across + 1
  //     } else if (gridnums[i] > 0 && grid[i] !== '.') {
  //       gridwords.push({
  //         id: i,
  //         letter: grid[i],
  //         number: gridnums[i],
  //         across: true,
  //         clueAcross: across,
  //         clueDown: null,
  //         down: null,
  //         value: null
  //       })
  //       if ((i + 1) % 15 === 0) across = across + 1
  //     } else if (grid[i] !== '.') {
  //       gridwords.push({
  //         id: i,
  //         letter: grid[i],
  //         clueAcross: across,
  //         clueDown: 0,
  //         across: true,
  //         down: null,
  //         value: null
  //       })
  //       if ((i + 1) % 15 === 0) across = across + 1
  //     } else {
  //       gridwords.push({
  //         id: i,
  //         letter: null
  //       })
  //       if ( i !== 0 && grid[i - 1] !== '.' && grid[i] === '.') across = across + 1
  //       console.log(i)
  //     }
  //   }

  //   for (let i = 0; i < grid.length; i++) {
  //     if (gridnums[i] > 0 && grid[i] !== '.' && grid[i + 15] !== '.' && i < 15) {
  //       findLetter(i).down = true
  //       findLetter(i).clueDown = down
  //       down = down + 1
  //     } else if (grid[i] !== '.' && (i - 15) >= 0 && grid[i - 15] !== '.' && findLetter(i - 15).down === true) {
  //       findLetter(i).down = true
  //       findLetter(i).clueDown = findLetter(i - 15).clueDown
  //     } else if (gridnums[i] > 0 && grid[i] !== '.' && (i - 15) >= 0 && grid[i - 15] === '.') {
  //       findLetter(i).down = true
  //       down = down + 1
  //       findLetter(i).clueDown = down
  //     }
  //   }
  //   this.setState({
  //     grid: gridwords,
  //     cluesAcross: data.cluesAcross,
  //     cluesDown: data.cluesDown
  //   })
  // }


  handleInputLetter = (input, boxx) => {

    let updatedGrid = this.state.grid.map(box => {
      if(box.id === boxx.id){
        return {
          ...box, value: input.toUpperCase()
        }
      }else{
        return box
      }
    })

    this.setState({grid: updatedGrid}) 
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.grid !== this.state.grid){
      this.countSolved()
    }
  }

  countSolved = () => {
    let solved = 0
    for(let i = 0; i <= this.state.cluesAcross.length + 1; i++){
      let filtered = this.state.grid.filter(box => box.clueAcross === i)
      if (filtered.length && filtered.every(box => box.value === box.letter)) {

        solved++;
      }
    }
    for(let j = 0; j <= this.state.cluesDown.length; j++){
      let filtered = this.state.grid.filter(box => box.clueDown === j)
      if (filtered.length && filtered.every(box => box.value === box.letter)){
        solved++;
      }
    }
    this.setState({corrects: solved})
  }


  render() {
    return (
      <div className="crossword">
        {console.log(this.state)}
        <div><Boxes grid={this.state.grid} handleInputLetter={this.handleInputLetter} corrects={this.state.corrects}/></div>
        <div>{this.state.clues && <Clues clues={this.state.clues.down} />}</div>
      </div>
    )
  }
}


export default Crossword;
