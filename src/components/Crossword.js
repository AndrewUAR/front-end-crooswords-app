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
          <div className="crossword-boxes">
            <div><Clues clues={this.state.cluesDown} down={'down'}/></div>
            <Boxes grid={this.state.grid} handleInputLetter={this.handleInputLetter} corrects={this.state.corrects} 
                totalWords={this.state.cluesAcross.length + this.state.cluesDown.length} handleNewGame={this.props.handleNewGame}/> 
            <div><Clues clues={this.state.cluesAcross} across={'across'} /></div>
          </div>
        </div>
    )
  }
}


export default Crossword;
