import React from 'react';

class Box extends React.Component {

  render() {
    let letter = this.props.letter;
    if (!this.props.letter) {
      return (
        <div className="box blank"></div>
       )
    }
    if (this.props.number) {
      return (
        <div className="box-wrapper">
          <label className="box-label box-label--number">{this.props.number}</label>
          <input type="text" onChange={(event) => this.props.handleCorrectLetter(event.target.value, this.props.id, this.props.letter)} maxLength="1" className="box" />
        </div>
      )
    }
    return (
      <input type="text" className="box-text" onChange={(event) => this.props.handleCorrectLetter(event.target.value, this.props.id, this.props.letter)} maxLength="1" className="box" />
    )
  }
}

export default Box;