import React from 'react'
import fetch from 'isomorphic-fetch'

export default class RegisterBeer extends React.Component {

  constructor() {
    super()

    this.submitBeer = this.submitBeer.bind(this)
    this.updateInput = this.updateInput.bind(this);

    this.fields = [
      {type: 'name', label: 'Name'},
      {type: 'text', label: 'Text'},
      {type: 'type', label: 'Type'},
      {type: 'category', label: 'Category'},
      {type: 'alcoholPercentage', label: 'Alcohol percentage'},
      {type: 'IBU', label: 'IBU'},
      {type: 'OG', label: 'OG'},
      {type: 'servingTemperature', label: 'Serving temperature'}
    ]

    this.state = {
      fields: this.fields.map(field => {
        return {
          [field.type]: ''
        }
      })
    };
  }

  submitBeer() {
    fetch('http://' + process.env.SERVER_NAME + ':' + process.env.SERVER_PORT + '/api/new-beer', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state.fields[0])
    }).then(() => {
      this.setState({
        fields: this.fields.map(field => {
          return {
            [field.type]: ''
          }
        })
      })
    })
  }

  updateInput(idx, fieldType, e) {
    const fields = this.state.fields;
    fields[idx] = {
      [fieldType]: e.target.value
    }

    this.setState({
      fields: fields
    })
  }

  render() {
    return (
      <div>
        {this.fields.map((field, idx) => {
          return (
            <label key={field.type}>{field.label}:
              <input
                type="text"
                value={this.state[field.type]}
                onChange={this.updateInput.bind(this, idx, [field.type])}
              />
            </label>
          )
        })}
        <button onClick={this.submitBeer}>Add new beer</button>
      </div>
    )
  }
}
