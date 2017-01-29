import React from 'react'
import SingleBeer from './SingleBeer'
import './styles/BeerCategory.css'

class BeerCategory extends React.Component{

  constructor() {
    super()
  }

  render() {
    let style = {}
    console.log("what is props ?", this.props);
    if (this.props.cat.color) {
      style.background = this.props.cat.color
    }
    console.log("what is style ?", style);

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
