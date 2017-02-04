import React from 'react'

class LogIn extends React.Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      failedAuth: false
    }
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
