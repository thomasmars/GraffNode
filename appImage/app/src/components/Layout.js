import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Link to="/">Home</Link>
          <Link to="/admin/registerBeer">Register beer</Link>
          <Link to="/admin/listBeer">List beer</Link>
        </header>
        <div className="app-content">{this.props.children}</div>
      </div>
    );
  }
}
