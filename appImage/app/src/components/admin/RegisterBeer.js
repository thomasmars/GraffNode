import React from 'react'
import fetch from 'isomorphic-fetch'
import {beerProperties} from '../../schema/beerSchema'

export default class RegisterBeer extends React.Component {

  constructor(props) {
    super(props)

    this.submitBeer = this.submitBeer.bind(this)
    this.updateInput = this.updateInput.bind(this);

    this.resetState = Object.keys(beerProperties).reduce((prev, key) => {
      prev[key] = ''
      return prev
    }, {})

    this.state = this.resetState

    if (this.props && this.props.params && this.props.params.id) {
      this.populateBeerData(this.props.params.id)
    }
  }

  populateBeerData(id) {
    fetch('http://' + process.env.SERVER_NAME + ':' + process.env.SERVER_PORT + `/api/get-beer/?id=${id}`)
      .then((response) => {
        return response.json()
      }).then((beer) => {
      this.setState(beer)
    })
  }

  submitBeer() {
    fetch('http://' + process.env.SERVER_NAME + ':' + process.env.SERVER_PORT + '/api/new-beer', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state)
    }).then(() => {
      this.setState(this.resetState)
    })
  }

  updateInput(key, e) {
    this.setState({
      [key]: e.target.value
    })
  }

  componentWillReceiveProps() {
    if (this.props.params && this.props.params.id) {
      this.populateBeerData(this.props.params.id);
    }
    else {
      this.setState(this.resetState);
    }
  }

  render() {
    return (
      <div>
        <div>
          Do we have any id ? {this.props.params.id}
        </div>
        <div>Register Beer:
          {Object.keys(this.state).map(key => {
            return Object.keys(beerProperties).indexOf(key) < 0 ? null : (
                <label key={key}>{key}:
                  <input
                    type="text"
                    value={this.state[key]}
                    onChange={this.updateInput.bind(this, key)}
                  />
                </label>
              )
          })}
          <button onClick={this.submitBeer}>Add new beer</button>
        </div>
      </div>
    )
  }
}
