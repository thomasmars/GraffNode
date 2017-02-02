import React from 'react'
import SingleBeer from './SingleBeer'
import './styles/BeerCategory.css'

class BeerCategory extends React.Component{

  constructor() {
    super()
  }

  render() {
    let style = {}
    if (this.props.cat.color) {
      style.background = this.props.cat.color
    }

    return (
      <div className={`beer-category ${this.props.beerCategory}`}>
        <div
          className="category-header"
          style={style}
        >
          {this.props.cat.name}
        </div>
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
