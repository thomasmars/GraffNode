import React from 'react'
import fetch from 'isomorphic-fetch'

export default class UserList extends React.Component {

  constructor() {
    super()

    this.state = {
      users: []
    }
    this.getUsers()
  }

  getUsers() {
    fetch('/api/get-users', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('grafftoken')
      },
      method: 'GET'
    }).then((response) => {
        return response.json()
      })
      .then(users => {
        this.setState({users: users})
      })
  }

  deleteUser(id) {
    fetch('/api/delete-user', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('grafftoken')
      },
      method: 'POST',
      body: JSON.stringify({ id })
    }).then(() => {
      this.getUsers()
    })
  }

  render() {
    return (
      <div>
        <div>
          Users registered:
        </div>
        <div>
          <ul>
            {this.state.users.map(user => {
              return (
                <li key={user._id}>
                  <span>{user.username}</span>
                  <button onClick={this.deleteUser.bind(this, user._id)}>Delete user</button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}
