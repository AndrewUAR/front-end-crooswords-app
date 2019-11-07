import React from 'react';

class Box extends React.Component {

  handleChange = () => {

  }

  render() {
    if (!this.props.letter) {
      return (
        <div className="box blank"></div>
       )
    }
    if (this.props.number) {
      return (
        <div className="box-wrapper">
          <label className="box-label box-label--number">{this.props.number}</label>
          <input type="text" onChange={this.handleChange} maxLength="1" className="box" />
        </div>
      )
    }
    return (
      <input type="text" className="box-text" onChange={this.handleChange} maxLength="1" className="box" />
    )
  }
}

export default Box;