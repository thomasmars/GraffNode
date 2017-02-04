import React from 'react'
import fetch from 'isomorphic-fetch'

const NO_CHANGE = 0
const FAILED_CHANGE = 1
const SUCCESSFULL_CHANGE = 2

class ChangePassword extends React.Component {

  constructor() {
    super()

    this.state = {
      updated: NO_CHANGE,
      username: '',
      oldPassword: '',
      newPassword: ''
    }
  }

  handleInput(inputName, e) {
    this.setState({
      [inputName]: e.target.value
    })
  }

  submitChange() {
    fetch('/api/change-password', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('grafftoken')
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      this.setState({
        updated: res.success ? SUCCESSFULL_CHANGE : FAILED_CHANGE
      })
    })
  }

  render() {
    return (
      <div>
        {
          this.state.updated === FAILED_CHANGE &&
          <div className="password-change-failed">Change failed</div>
        }
        {
          this.state.updated === SUCCESSFULL_CHANGE &&
          <div className="password-change-success">Successfully changed password</div>
        }
        <div>Change password of account:</div>
        <label>Username of the account:
          <input onChange={this.handleInput.bind(this, 'username')} type="text"/>
        </label>
        <label>Old password:
          <input onChange={this.handleInput.bind(this, 'oldPassword')} type="password"/>
        </label>
        <label>New password:
          <input onChange={this.handleInput.bind(this, 'newPassword')} type="password"/>
        </label>
        <button onClick={this.submitChange.bind(this)}>Submit password change</button>
      </div>
    )
  }
}

export default ChangePassword
