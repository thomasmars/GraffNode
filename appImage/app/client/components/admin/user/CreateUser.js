import React from 'react'
import fetch from 'isomorphic-fetch'
import './styles/CreateUser.css'

const NOT_CREATED = 0
const FAILED_CREATING = 1
const SUCCESS_CREATING = 2

class CreateUser extends React.Component {

  constructor() {
    super()

    this.state = {
      updated: NOT_CREATED,
      username: '',
      password: '',
    }
  }

  handleInput(inputName, e) {
    this.setState({
      [inputName]: e.target.value
    })
  }

  submitChange() {
    fetch('/api/create-user', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('grafftoken')
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => {
      this.setState({
        updated: res.status === 200 ? SUCCESS_CREATING : FAILED_CREATING
      })
    })
  }

  render() {
    return (
      <div>
        {
          this.state.updated === FAILED_CREATING &&
          <div className="password-change-failed">Failed creating new user</div>
        }
        {
          this.state.updated === SUCCESS_CREATING &&
          <div className="password-change-success">Successfully created new user</div>
        }
        <div>Create new account</div>
        <div className="user-registration-table">
          <div className="user-registration-row">
            <div>Username</div>
            <input onChange={this.handleInput.bind(this, 'username')} type="text"/>
          </div>
          <div className="user-registration-row">
            <div>Password</div>
            <input onChange={this.handleInput.bind(this, 'password')} type="password"/>
          </div>

        </div>
        <button onClick={this.submitChange.bind(this)}>Create new user</button>
      </div>
    )
  }
}

export default CreateUser
