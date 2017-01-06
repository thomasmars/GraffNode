// src/components/IndexPage.js
import React from 'react';
import fetch from 'isomorphic-fetch';

export default class HorsePage extends React.Component {

  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
    this.submitHorse = this.submitHorse.bind(this)
    this.state = {
      input: ''
    }
  }

  submitHorse() {
    console.log("submitted", this.state.input);
    console.log("stringified", JSON.stringify({ horseName: this.state.input }))

    fetch('http://' + process.env.SERVER_NAME + ':' + process.env.SERVER_PORT + '/api/newhorse', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        horseName: this.state.input
      })
    })
    this.setState({input: ''});
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    })
  }

  render() {
    return (
      <div className="home">
        <div className="athletes-selector">
          Name your horse:
        </div>
        <input type="text" value={this.state.input} onChange={this.handleChange}/>
        <button onClick={this.submitHorse}>Submit!</button>
      </div>
    );
  }
}
