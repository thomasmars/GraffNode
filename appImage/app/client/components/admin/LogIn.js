import React from 'react'
import fetch from 'isomorphic-fetch'

class LogIn extends React.Component {
  constructor() {
    super()
  }

  handleInput(inputName, e) {
    this.setState({
      [inputName]: e.target.value
    })
  }

  handleLogin() {
    fetch('/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state)
    }).then((res, req) => {
      if (res.url) {
        window.location = res.url
      }
    })
  }

  render() {
    return (
      <div>
        <div>Log in:</div>
        <label>Username:
          <input onChange={this.handleInput.bind(this, 'username')} type="text"/>
        </label>
        <label>Password:
          <input onChange={this.handleInput.bind(this, 'password')} type="password"/>
        </label>
        <button onClick={this.handleLogin.bind(this)}>Login</button>
      </div>
    )
  }
}

export default LogIn
