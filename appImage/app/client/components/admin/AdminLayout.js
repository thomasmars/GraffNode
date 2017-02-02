import React from 'react'
import LogIn from './LogIn'
import fetch from 'isomorphic-fetch'

export default class AdminLayout extends React.Component {
  constructor() {
    super()

    this.state = {
      loggedIn: false
    }
  }

  render() {
    const loggedIn = this.state.loggedIn ?
      <div>{this.props.children}</div> :
      <LogIn/>

    return (
      <div className="app-admin">
        {loggedIn}
      </div>
    );
  }
}
