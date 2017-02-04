import React from 'react'
import fetch from 'isomorphic-fetch'
import {Link} from 'react-router'
import './styles/CategoryList.css'

export default class CategoryList extends React.Component {

  constructor() {
    super()

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
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('grafftoken')
      },
      method: 'POST',
      body: JSON.stringify({id})
    }).then(() => {
      this.getCategories()
    })
  }

  render() {
    return (
      <div>
        <div>
          Categories registered:
        </div>
        <div className="category-list">
          {this.state.categories.map(category => {
            return (
              <div className="category-row" key={category._id}>
                <div className="category-row">{category.name}</div>
                <Link
                  className="category-edit"
                  to={`/admin/categoryRegistration/${category._id}`}
                >
                  Edit category
                </Link>
                <button
                  className="category-delete"
                  onClick={this.deleteCategory.bind(this, category._id)}
                >
                  Delete category
                </button>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}
