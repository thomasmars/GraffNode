import React from 'react';
import fetch from 'isomorphic-fetch';

export default class HorsePage extends React.Component {

  constructor() {
    super()

    this.state = {
      stableHorses: []
    }
    fetch('http://' + process.env.SERVER_NAME + ':' + process.env.SERVER_PORT + '/api/stableHorses')
      .then((response) => {
        console.log("we got a response", response);
        return response.json();
      })
      .then((stories) => {
        console.log("stories ?", stories);
        this.setState({stableHorses: stories})
      })

  }

  render() {
    return (
      <div className="home">
        <div className="athletes-selector">
          Horses in the stable:
        </div>
        <div>
          <ul>
            {this.state.stableHorses.map((horse) => {
              console.log("mapping...", horse)
              return <li key={horse._id}>{horse.name}</li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}
