import React from 'react'
import fetch from 'isomorphic-fetch'
import { Link } from 'react-router'

export default class ListBeer extends React.Component {

  constructor() {
    super()

    this.deleteBeer = this.deleteCategory.bind(this)

    this.state = {
      categories: []
    }
    this.getCategories()
  }

  getCategories() {
    fetch('/api/get-category')
      .then((response) => {
        return response.json()
      })
      .then((categories) => {
        this.setState({categories: categories})
      })
  }

  deleteCategory(id) {
    fetch('/api/delete-category', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ id })
    }).then(() => {
      this.getCategories()
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
            {this.state.categories.map(category => {
              return (
                <li key={category._id}>
                  <span>{category.name}</span>
                  <Link to={`/admin/categoryRegistration/${category._id}`}>Edit beer</Link>
                  <button onClick={this.deleteCategory.bind(this, category._id)}>Delete beer</button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}
