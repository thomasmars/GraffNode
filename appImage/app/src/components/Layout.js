import React from 'react'
import './styles/Layout.css'

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <div className="app-content">{this.props.children}</div>
      </div>
    );
  }
}
