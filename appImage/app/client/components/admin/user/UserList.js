import React from 'react'
import fetch from 'isomorphic-fetch'
import './styles/UserList.css'

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
        <div>Users registered</div>
        <div className="user-table">
            {this.state.users.map(user => {
              return (
                <div className="user-row" key={user._id}>
                  <div className="user-table-name">{user.username}</div>
                  <button className="user-delete" onClick={this.deleteUser.bind(this, user._id)}>Delete user</button>
                </div>
              )
            })}
        </div>
      </div>
    );
  }
}
