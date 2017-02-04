import React from 'react'
import fetch from 'isomorphic-fetch'

class LogIn extends React.Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      failedAuth: false
    }
  }

  handleInput(inputName, e) {
    this.setState({
      [inputName]: e.target.value
    })
  }

  handleLogin() {
    fetch('/api/authenticate', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      if (res.token) {
        window.localStorage.setItem('grafftoken', res.token)
        window.location = '/admin'
      }
      else {
        this.setState({
          failedAuth: true
        })
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.failedAuth && <div className="failed-auth">Failed authentication</div>}
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
