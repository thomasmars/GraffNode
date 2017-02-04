import React from 'react'
import AdminPaths from './AdminPaths'

export default class AdminLayout extends React.Component {
  constructor() {
    super()

    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {
    if (!global || !global.window) {
      return;
    }

    const token = window.localStorage.getItem('grafftoken')

    if (!token) {
      window.location = '/login'
    }

    fetch('/api/check-authentication', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      method: 'GET'
    }).then(res => {
      return res.json()
    }).then(res => {
      if (!res.success) {
        window.location = '/login'
      }
      else {
        this.setState({
          loggedIn: true
        })
      }
    })
  }

  render() {
    return (
      <div className="app-admin">
        {!this.state.loggedIn && <div>Logging in...</div>}
        {this.state.loggedIn && <AdminPaths>{this.props.children}</AdminPaths>}
      </div>
    );
  }
}
