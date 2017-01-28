import React from 'react'
import SingleBeer from './SingleBeer'
import './styles/BeerCategory.css'

class BeerCategory extends React.Component{

  constructor() {
    super()
  }

  render() {
    return (
      <div className={`beer-category ${this.props.beerCategory}`}>
        <div className="category-header">{this.props.cat.name}</div>
        {this.props.cat.beers.map(beer => {
          return (
            <SingleBeer eventEmitter={this.props.eventEmitter} {...beer} key={beer._id} />
          )
        })}
      </div>
    )
  }
}

export default BeerCategory;
