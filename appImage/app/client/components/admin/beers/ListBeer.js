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
    fetch('/api/get-beer').then((response) => {
        return response.json()
      }).then((beers) => {
        this.setState({beers: beers})
      })
  }

  deleteBeer(id) {
    fetch('/api/delete-beer', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('grafftoken')
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
