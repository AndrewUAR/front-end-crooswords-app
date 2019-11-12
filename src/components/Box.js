import React from 'react';

class Box extends React.Component {

  render() {
    if (!this.props.box.letter) {
      return (
        <div className="box blank"></div>
       )
    }else if (this.props.box.number) {
      return (
        <div className={"box-wrapper"}>
          <label className="box-label box-label--number">{this.props.box.number}</label>
          <input type="text" onChange={(event) => this.props.handleInputLetter(event.target.value, this.props.box)} maxLength="1" className="box" />
        </div>
      )
    } else {
      return (
        <input type="text" className="box box-text" onChange={(event) => this.props.handleInputLetter(event.target.value, this.props.box)} maxLength="1" />
      )
    }
  }
}

export default Box;