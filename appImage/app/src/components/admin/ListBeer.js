import React from 'react'
import fetch from 'isomorphic-fetch'
import { Link } from 'react-router'

export default class ListBeer extends React.Component {

  constructor() {
    super()

    this.deleteBeer = this.deleteBeer.bind(this)

    this.state = {
      beers: []
    }
    this.getBeers()
  }

  getBeers() {
    fetch('http://' + process.env.SERVER_NAME + ':' + process.env.SERVER_PORT + '/api/get-beer')
      .then((response) => {
        return response.json()
      })
      .then((beers) => {
        this.setState({beers: beers})
      })
  }

  deleteBeer(id) {
    fetch('http://' + process.env.SERVER_NAME + ':' + process.env.SERVER_PORT + '/api/delete-beer', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ id })
    }).then(() => {
      this.getBeers()
    })
  }

  render() {
    return (
      <div>
        <div>
          Beers registered:
        </div>
        <div>
          <ul>
            {this.state.beers.map((beer) => {
              return (
                <li key={beer._id}>
                  <span>{beer.name}</span>
                  <Link to={`/admin/registerBeer/${beer._id}`}>Edit beer</Link>
                  <button onClick={this.deleteBeer.bind(this, beer._id)}>Delete beer</button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}
