import React from 'react'
import fetch from 'isomorphic-fetch'
import {beerProperties} from '../../schema/beerSchema'

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
      beerProps
    }

    this.state = this.resetState

    if (this.props && this.props.params && this.props.params.id) {
      this.populateBeerData(this.props.params.id)
    }
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

  submitBeer() {
    const data = new FormData()
    data.append('image', this.state.image)
    data.append('_id', this.state['_id'])
    data.append('beerProps', JSON.stringify(this.state.beerProps))

    fetch('/api/new-beer', {
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

  componentWillReceiveProps() {
    if (this.props.params && this.props.params.id) {
      this.populateBeerData(this.props.params.id);
    }
    else {
      this.setState(this.resetState);
    }
  }

  render() {
    const {imagePreview} = this.state;
    let imagePreviewEl = null;
    if (imagePreview) {
      imagePreviewEl = (<img style={{width: '5em'}} src={imagePreview}/>)
    }

    return (
      <div>
        <div>
          Do we have any id ? {this.props.params.id}
        </div>
        <div>Register Beer:
          <label>
            {imagePreviewEl}
            <input type="file" accept="image/*" onChange={this.updateImage}/>
          </label>
          {Object.keys(beerProperties).map(key => {
            return (
                <label key={key}>{key}:
                  <input
                    type="text"
                    value={this.state.beerProps[key]}
                    onChange={this.updateInput.bind(this, key)}
                  />
                </label>
              )
          })}
          <button onClick={this.submitBeer}>Add new beer</button>
        </div>
      </div>
    )
  }
}
