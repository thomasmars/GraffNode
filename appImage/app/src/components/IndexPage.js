import React from 'react'
import fetch from 'isomorphic-fetch'
import './styles/IndexPage.css'
import BeerCategory from './beer-components/BeerCategory'
import EventEmitter from 'wolfy87-eventemitter'
import Header from './header/Header'

export default class ListBeer extends React.Component {

  constructor() {
    super()

    this.eventEmitter = new EventEmitter()

    this.state = {
      categories: []
    }
    this.getBeers()
  }

  getBeers() {
    fetch('/api/get-beer')
      .then((response) => {
        return response.json()
      })
      .then((beers) => {
          const categories = beers.reduce((categories, beer) => {
            const idx = categories.findIndex(cat => cat.name === beer.category)
            if (idx >= 0) {
              categories[idx].beers.push(beer)
            }
            else {
              categories.push({
                name: beer.category,
                beers: [beer]
              })
            }
            return categories;
          }, [])
            .sort((a, b) => {
              return (a.name > b.name) ? 1 : -1
            })
          this.setState({
            categories
          })
        }
      )
  }

  render() {
    return (
      <div>
        <Header/>
        {this.state.categories.map((cat) => {
          const beerCategory = cat.name.toLowerCase().replace(/ /gi, '-')
          return (
            <BeerCategory
              eventEmitter={this.eventEmitter}
              cat={cat}
              beerCategory={beerCategory}
              key={beerCategory}
            />
          )
        })}
      </div>
    );
  }
}
