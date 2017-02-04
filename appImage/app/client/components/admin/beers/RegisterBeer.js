import React from 'react'
import fetch from 'isomorphic-fetch'
import {beerProperties} from '../../../../server/schemas/beer'
import './styles/RegisterBeer.css'

export default class RegisterBeer extends React.Component {

  constructor(props) {
    super(props)

    this.submitBeer = this.submitBeer.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.updateImage = this.updateImage.bind(this)

    const beerProps = Object.keys(beerProperties)
      .reduce((prev, key) => {
        prev[key] = ''
        return prev
      }, {})

    this.resetState = {
      '_id': '',
      image: null,
      imagePreview: null,
      beerProps,
      availableCategories: []
    }
    this.state = this.resetState
  }

  populateBeerData(id) {
    fetch(`/api/get-beer/?id=${id}`)
      .then((response) => {
        return response.json()
      }).then((beer) => {


      this.setState({
        '_id': beer['_id'],
        beerProps: Object.keys(beerProperties)
          .reduce((prev, key) => {
            prev[key] = beer[key]
            return prev
          }, {}),
        imagePreview: beer.imagePath
      })
    })
  }

  populateCategoryData() {
    fetch('/api/get-category', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('grafftoken')
      },
      method: 'GET'
    }).then(response => {
      return response.json()
    })
      .then(categories => {
        this.setState({
          availableCategories: categories
        })
      })
  }

  submitBeer() {
    const data = new FormData()
    data.append('image', this.state.image)
    data.append('_id', this.state['_id'])
    data.append('beerProps', JSON.stringify(this.state.beerProps))

    fetch('/api/new-beer', {
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
    const beerProps = Object.assign(this.state.beerProps, {
      [key]: e.target.value
    })

    this.setState({
      beerProps
    })
  }

  updateImage(e) {
    const image = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      this.setState({
        image: image,
        imagePreview: reader.result
      })
    }

    reader.readAsDataURL(image)
  }

  updateCategory(e) {
    const beerProps = {
      ...this.state.beerProps,
      category: e.target.value
    }
    this.setState({
      beerProps
    })
  }

  componentWillReceiveProps() {
    if (this.props.params && this.props.params.id) {
      this.populateBeerData(this.props.params.id);
    }
  }

  componentWillMount() {
    // Populate beer data
    if (this.props && this.props.params && this.props.params.id) {
      this.populateBeerData(this.props.params.id)
    }

    // Populate category data
    this.populateCategoryData()
  }

  categoryExists(categoryName) {
    return this.state.availableCategories.find(category => {
      return category.name === categoryName;
    })
  }

  render() {
    const {imagePreview} = this.state;
    let imagePreviewEl = null;
    if (imagePreview) {
      imagePreviewEl = (<img style={{width: '5em'}} src={imagePreview}/>)
    }

    let nonExistingCategory = null;
    if (!this.categoryExists(this.state.beerProps['category'])) {
      nonExistingCategory = (
        <option
          value={this.state.beerProps['category']}
        >
          {this.state.beerProps['category']}
        </option>
      )
    }

    return (
      <div>
        <div>Register Beer</div>
        <div className="beer-registration-table">
          <div className="beer-registration-row">
            <div>Beer image</div>
            {imagePreviewEl && <div className="image-preview">{imagePreviewEl}</div>}
            <input type="file" accept="image/*" onChange={this.updateImage}/>
          </div>
          {Object.keys(beerProperties).map(key => {
            if (key === 'category') {
              return (
                <div className="beer-registration-row" key={key}>
                  <div>{key}</div>
                  <div>
                    <select
                      value={this.state.beerProps['category']}
                      onChange={this.updateCategory.bind(this)}
                    >
                      {nonExistingCategory}
                      {
                        this.state.availableCategories.map(category => {
                          return (
                            <option
                              key={category.name}
                              value={category.name}
                            >
                              {category.name}
                            </option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
              )
            }
            else {
              return (
                <div className="beer-registration-row" key={key}>
                  <div>{key}</div>
                  <input
                    type="text"
                    value={this.state.beerProps[key]}
                    onChange={this.updateInput.bind(this, key)}
                  />
                </div>
              )
            }
          })}
          <button onClick={this.submitBeer}>Add new beer</button>
        </div>
      </div>
    )
  }
}
