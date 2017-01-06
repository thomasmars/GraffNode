import React from 'react';
import fetch from 'isomorphic-fetch';

export default class ListBeer extends React.Component {

  constructor() {
    super()

    this.state = {
      beers: []
    }
    fetch('http://' + process.env.SERVER_NAME + ':' + process.env.SERVER_PORT + '/api/get-beer')
      .then((response) => {
        return response.json();
      })
      .then((beers) => {
        this.setState({beers: beers})
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
              return <li key={beer._id}>{beer.name}</li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}
