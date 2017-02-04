import React from 'react'
import fetch from 'isomorphic-fetch'
import {categoryProperties} from '../../../../server/schemas/category'
import './styles/CategoryRegistration.css'

export default class CategoryRegistration extends React.Component {

  constructor(props) {
    super(props)

    this.submitCategory = this.submitCategory.bind(this)
    this.updateInput = this.updateInput.bind(this)

    const categoryProps = Object.keys(categoryProperties)
      .reduce((prev, key) => {
        prev[key] = ''
        return prev
      }, {})

    this.resetState = {
      '_id': '',
      categoryProps
    }

    this.state = this.resetState

    if (this.props && this.props.params && this.props.params.id) {
      this.populateCategoryData(this.props.params.id)
    }
  }

  populateCategoryData(id) {
    fetch(`/api/get-category/?id=${id}`)
      .then((response) => {
        return response.json()
      }).then(category => {


      this.setState({
        '_id': category['_id'],
        categoryProps: Object.keys(categoryProperties)
          .reduce((prev, key) => {
            prev[key] = category[key]
            return prev
          }, {})
      })
    })
  }

  submitCategory() {
    const data = new FormData()
    data.append('_id', this.state['_id'])
    data.append('categoryProps', JSON.stringify(this.state.categoryProps))

    fetch('/api/new-category', {
      headers: {
        'x-access-token': window.localStorage.getItem('grafftoken')
      },
      method: 'POST',
      body: data
    }).then(() => {
      this.setState(this.resetState)
    })
  }

  updateInput(key, e) {
    const categoryProps = Object.assign(this.state.categoryProps, {
      [key]: e.target.value
    })

    this.setState({
      categoryProps
    })
  }

  componentWillReceiveProps() {
    if (this.props.params && this.props.params.id) {
      this.populateCategoryData(this.props.params.id);
    }
    else {
      this.setState(this.resetState);
    }
  }

  render() {
    return (
      <div>
        <div>Register Category</div>
        <div className="category-registration-table">
          {Object.keys(categoryProperties).map(key => {
            return (
              <div className="category-registration-row" key={key}>
                <div>{key}</div>
                <input
                  type="text"
                  value={this.state.categoryProps[key]}
                  onChange={this.updateInput.bind(this, key)}
                />
              </div>
            )
          })}
        </div>
        <button onClick={this.submitCategory}>Add new category</button>
      </div>
    )
  }
}
