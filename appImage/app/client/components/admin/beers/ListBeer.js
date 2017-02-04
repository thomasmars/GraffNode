import React from 'react'
import fetch from 'isomorphic-fetch'
import { Link } from 'react-router'
import './styles/ListBeer.css'

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
          <div className="beer-table">
            {this.state.beers.map((beer) => {
              return (
                <div className="beer-row" key={beer._id}>
                  <div className="beer-table-name">{beer.name}</div>
                  <Link className="beer-edit" to={`/admin/registerBeer/${beer._id}`}>Edit beer</Link>
                  <button
                    className="beer-delete"
                    onClick={this.deleteBeer.bind(this, beer._id)}
                  >
                    Delete beer
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}
