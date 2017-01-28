import React from 'react';
import './styles/SingleBeer.css'

class SingleBeer extends React.Component {

  constructor(props) {
    super(props)

    this.eventEmitter = props.eventEmitter;
    this.state = {
      showingImage: true
    }

    this.flipCard.bind(this)
  }

  componentWillMount() {
    this.eventEmitter.addListener('flippingCard', () => {
      this.setState({
        showingImage: true
      })
    })
  }


  flipCard() {
    this.eventEmitter.emitEvent('flippingCard');

    this.setState({
      showingImage: !this.state.showingImage
    })
  }

  render() {
    const imageClasses = `image${this.state.showingImage ? '' : ' hidden'}`
    const beerInfoClasses = `beer-info${this.state.showingImage ? ' hidden' : ''}`

    return (
      (
        <div onClick={this.flipCard.bind(this)} className="image-container">
          <img className={imageClasses} src={this.props.imagePath} />
          <div className={beerInfoClasses}>
            <div>{this.props.name}</div>
            <div>{this.props.text}</div>
            <div>{this.props.alcoholPercentage}</div>
          </div>
        </div>
      )
    )
  }
}

export default SingleBeer;
