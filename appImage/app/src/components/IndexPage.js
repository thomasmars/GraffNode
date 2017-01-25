import React from 'react'
import fetch from 'isomorphic-fetch'
import './styles/IndexPage.css'

export default class ListBeer extends React.Component {

  constructor() {
    super()

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
        {this.state.categories.map((cat) => {
          const beerCategory = cat.name.toLowerCase().replace(/ /gi, '-')
          return (
            <div className={`beer-category ${beerCategory}`} key={beerCategory}>
              <div className="category-header">{cat.name}</div>
              {cat.beers.map(beer => {
                return (
                  <div className="image-container" key={beer._id}>
                    <img className="image" src={beer.imagePath}/>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    );
  }
}
